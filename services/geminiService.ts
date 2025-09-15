import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import Groq from "groq-sdk";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from '../constants';
import AnalyticsService from './analyticsService';

// Get API keys from localStorage (BYOK architecture)
function getApiKeys() {
  const storedKeys = localStorage.getItem('byok_api_keys');
  if (storedKeys) {
    return JSON.parse(storedKeys);
  }
  return {};
}

function getGeminiClient() {
  const keys = getApiKeys();
  const apiKey = keys.gemini;
  
  if (!apiKey || !apiKey.startsWith("AIza")) {
    return null;
  }
  
  return new GoogleGenerativeAI(apiKey);
}

function getGroqClient() {
  const keys = getApiKeys();
  const apiKey = keys.groq;
  
  if (!apiKey || !apiKey.startsWith("gsk_")) {
    return null;
  }
  
  return new Groq({
    apiKey,
    dangerouslyAllowBrowser: true
  });
}

function getOpenRouterClient() {
  const keys = getApiKeys();
  const apiKey = keys.openrouter;
  
  if (!apiKey || !apiKey.startsWith("sk-or-")) {
    return null;
  }
  
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true
  });
}

function ensureConfigured(): void {
  const gemini = getGeminiClient();
  const groq = getGroqClient();
  const openrouter = getOpenRouterClient();
  
  if (!gemini && !groq && !openrouter) {
    throw new Error("No valid API keys configured. Please configure at least one API key in Settings:\n1. Gemini API key from https://aistudio.google.com/\n2. Groq API key from https://console.groq.com/\n3. OpenRouter API key from https://openrouter.ai/");
  }
}

// Define a unified chat interface
interface UnifiedChat {
  provider: 'gemini' | 'groq' | 'openrouter';
  geminiModel?: GenerativeModel;
  groqClient?: Groq;
  openrouterClient?: OpenAI;
  messages?: Array<{ role: string; content: string }>;
}

export function createChatSession(): UnifiedChat {
  ensureConfigured();

  // Try Gemini first
  const geminiAI = getGeminiClient();
  if (geminiAI) {
    try {
      const model = geminiAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      console.log("✅ Using Gemini API as primary");
      return { provider: 'gemini', geminiModel: model };
    } catch (error) {
      console.warn("Gemini initialization failed, falling back:", error);
    }
  }

  // Try Groq next
  const groqClient = getGroqClient();
  if (groqClient) {
    try {
      console.log("✅ Using Groq API as fallback");
      return { 
        provider: 'groq', 
        groqClient: groqClient,
        messages: []
      };
    } catch (error) {
      console.warn("Groq initialization failed, falling back:", error);
    }
  }

  // Try OpenRouter last
  const openRouterClient = getOpenRouterClient();
  if (openRouterClient) {
    try {
      console.log("✅ Using OpenRouter API as fallback");
      return { 
        provider: 'openrouter', 
        openrouterClient: openRouterClient,
        messages: []
      };
    } catch (error) {
      console.warn("OpenRouter initialization failed:", error);
    }
  }

  throw new Error("All AI providers failed to initialize");
}

export async function* sendMessage(
  chat: UnifiedChat,
  message: string,
  userId?: string
): AsyncGenerator<string, void, unknown> {
  ensureConfigured();

  const analytics = AnalyticsService.getInstance();

  if (chat.provider === 'gemini' && chat.geminiModel) {
    try {
      const result = await chat.geminiModel.generateContentStream([
        SYSTEM_PROMPT,
        message
      ]);

      // Track successful Gemini usage
      analytics.trackAPIUsage('gemini');
      if (userId) analytics.trackMessage(userId, 'gemini');

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
      return;
    } catch (error) {
      console.warn("Gemini request failed, falling back:", error);
      // Fall back to other APIs
      yield* sendFallbackMessage(chat, message, userId);
      return;
    }
  }

  // Use fallback APIs
  yield* sendFallbackMessage(chat, message, userId);
}

async function* sendFallbackMessage(
  _chat: UnifiedChat,
  message: string,
  userId?: string
): AsyncGenerator<string, void, unknown> {
  const analytics = AnalyticsService.getInstance();

  // Try Groq fallback
  const groqClient = getGroqClient();
  if (groqClient) {
    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ];

      const completion = await groqClient.chat.completions.create({
        model: "llama-3.1-70b-versatile",
        messages: messages as any,
        stream: true,
        max_tokens: 2000,
        temperature: 0.7,
      });

      analytics.trackAPIUsage('groq');
      if (userId) analytics.trackMessage(userId, 'groq');

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
      return;
    } catch (error) {
      console.warn("Groq fallback failed:", error);
    }
  }

  // Try OpenRouter fallback
  const openRouterClient = getOpenRouterClient();
  if (openRouterClient) {
    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ];

      const completion = await openRouterClient.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: messages as any,
        stream: true,
        max_tokens: 2000,
        temperature: 0.7,
      });

      analytics.trackAPIUsage('openrouter');
      if (userId) analytics.trackMessage(userId, 'openrouter');

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
      return;
    } catch (error) {
      console.warn("OpenRouter fallback failed:", error);
    }
  }

  // If all providers fail, throw an error
  throw new Error("All AI providers failed to respond. Please check your API keys and try again.");
}

export function getAvailableProviders(): string[] {
  const providers = [];
  
  if (getGeminiClient()) providers.push('gemini');
  if (getGroqClient()) providers.push('groq');
  if (getOpenRouterClient()) providers.push('openrouter');
  
  return providers;
}

export function checkAPIHealth(): { [key: string]: boolean } {
  return {
    gemini: !!getGeminiClient(),
    groq: !!getGroqClient(),
    openrouter: !!getOpenRouterClient()
  };
}

// Legacy exports for backward compatibility
export async function sendMessageStream(
  _chat: UnifiedChat,
  message: string,
  userId?: string
): Promise<AsyncGenerator<string, void, unknown>> {
  // Create a new chat session and send message
  const chat = createChatSession();
  return sendMessage(chat, message, userId);
}
