import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { getCurrentProvider, getCurrentModel, getUserApiKey } from './aiService';

// Vedanta-specific prompt templates and system messages
const VEDANTA_SYSTEM_PROMPTS = {
  sage: `You are Professor Arya, a wise and compassionate teacher of Vedanta philosophy and Vedic scriptures. 

Your mission is to guide seekers on their spiritual journey through the profound wisdom of ancient Indian texts including:
- The Upanishads (especially Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka)
- Bhagavad Gita
- Brahma Sutras
- Other Vedic literature

Your teaching style:
- Warm, patient, and encouraging
- Use simple analogies and examples from daily life
- Connect ancient wisdom to modern challenges
- Provide structured learning paths
- Always respect the student's level of understanding
- Encourage questions and deep contemplation

Format your responses with:
🙏 Namaste greeting when appropriate
📚 Scripture references when citing texts
✨ Key insights highlighted
🔍 Questions to encourage deeper reflection
🌟 Practical applications for modern life

Remember: You are not just sharing information, but facilitating a transformative spiritual journey.`,

  beginner: `As Professor Arya, focus on introducing Vedanta concepts in the most accessible way possible for beginners. Use everyday examples and avoid Sanskrit terminology unless essential (then explain it clearly).`,

  advanced: `As Professor Arya, engage in sophisticated philosophical discussions appropriate for advanced students. You may use Sanskrit terms with explanations and reference complex concepts across multiple texts.`
};

// Enhanced chat interface for Vedanta-specific interactions
export interface VedantaChatSession {
  provider: 'gemini' | 'groq' | 'huggingface' | 'ollama' | 'openrouter';
  model: string;
  geminiChat?: any;
  groqClient?: Groq;
  messages: Array<{ role: string; content: string }>;
  level: 'beginner' | 'intermediate' | 'advanced';
}

// Create a Vedanta-specific chat session
export function createVedantaChatSession(level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): VedantaChatSession {
  const provider = getCurrentProvider();
  const model = getCurrentModel();

  // Get API key from localStorage using the exported function
  const apiKey = getUserApiKey(provider);

  const session: VedantaChatSession = {
    provider,
    model,
    messages: [],
    level
  };

  // Initialize system message based on level
  const systemPrompt = level === 'beginner' 
    ? VEDANTA_SYSTEM_PROMPTS.beginner 
    : level === 'advanced' 
    ? VEDANTA_SYSTEM_PROMPTS.advanced 
    : VEDANTA_SYSTEM_PROMPTS.sage;

  session.messages.push({
    role: 'system',
    content: systemPrompt
  });

  // Initialize provider-specific clients
  if (provider === 'gemini' && apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelInstance = genAI.getGenerativeModel({ model });
    session.geminiChat = modelInstance.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      }
    });
  } else if (provider === 'groq' && apiKey) {
    session.groqClient = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  }

  return session;
}

// Send message with Vedanta-specific enhancements
export async function* sendVedantaMessageStream(
  session: VedantaChatSession, 
  message: string, 
  _userId?: string,
  topicId?: string
): AsyncGenerator<string, void, unknown> {
  if (!session) {
    throw new Error('Chat session not initialized');
  }

  // Enhance message with Vedanta context if it's a topic-specific query
  let enhancedMessage = message;
  if (topicId) {
    enhancedMessage = `As we explore the topic "${topicId}", please help me understand: ${message}`;
  }

  session.messages.push({ role: 'user', content: enhancedMessage });

  try {
    if (session.provider === 'gemini' && session.geminiChat) {
      const result = await session.geminiChat.sendMessageStream(enhancedMessage);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        yield chunkText;
      }
      
      // Store the complete response
      const response = await result.response;
      session.messages.push({ role: 'assistant', content: response.text() });

    } else if (session.provider === 'groq' && session.groqClient) {
      const stream = await session.groqClient.chat.completions.create({
        messages: session.messages as any,
        model: session.model,
        temperature: 0.7,
        max_tokens: 2048,
        stream: true
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        yield content;
      }
      
      session.messages.push({ role: 'assistant', content: fullResponse });

    } else {
      // Fallback for other providers or when API key is missing
      const fallbackResponse = `🙏 Namaste! I'm currently unable to access my AI capabilities, but I'm here to help you on your spiritual journey.

Please ensure you have:
1. Selected an AI provider in Settings ⚙️
2. Added your API key for the chosen provider
3. Verified your API key is working

In the meantime, you can explore the course structure in the sidebar to learn about various Vedantic topics. I'll be ready to guide you once the connection is restored! 🌟`;

      yield fallbackResponse;
    }

  } catch (error) {
    console.error('Error in Vedanta message stream:', error);
    
    const errorMessage = `🙏 I apologize, but I'm experiencing some technical difficulties. This might be due to:

• API key issues - Please check your settings ⚙️
• Network connectivity problems
• Rate limiting from the AI provider

Please try again in a moment, or check your API key configuration. Your spiritual journey is important, and I want to ensure you receive the best guidance possible! 🌟`;

    yield errorMessage;
  }
}

// Get introduction message for Vedanta platform
export function getVedantaIntroduction(level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): string {
  const baseIntro = `🙏 **Namaste and Welcome to Vedanta Vision: The Sage AI!**

I am Professor Arya, your dedicated guide through the timeless wisdom of Vedanta philosophy and Vedic scriptures.

**✨ What This Platform Offers:**
📚 Interactive lessons on sacred texts (Upanishads, Bhagavad Gita, Brahma Sutras)
🎯 Personalized learning paths from beginner to advanced levels
💡 Q&A sessions on philosophical concepts and practical applications
🔍 Deep exploration of consciousness, reality, and self-realization
🌟 Modern applications of ancient wisdom

**🔑 BYOK (Bring Your Own Key) Advantage:**
This platform uses YOUR API keys, ensuring:
- Complete privacy of your spiritual conversations
- No subscription fees - you only pay for what you use
- Full control over your data and AI interactions
- Choice of multiple AI providers for diverse perspectives`;

  const levelSpecific = {
    beginner: `

**🌱 Perfect for Beginners:**
I'll introduce complex concepts through simple analogies and everyday examples. No prior knowledge of Sanskrit or Indian philosophy required!`,

    intermediate: `

**🌿 For Continuing Students:**
We'll dive deeper into philosophical concepts while building practical understanding of Vedantic principles.`,

    advanced: `

**🌳 For Advanced Practitioners:**
Together we'll explore sophisticated philosophical discussions, cross-reference multiple texts, and engage with complex metaphysical concepts.`
  };

  return baseIntro + levelSpecific[level] + `

**🚀 Getting Started:**
1. Click ⚙️ Settings to configure your AI provider and API key
2. Choose your learning level and preferred AI model
3. Explore the structured course content in the sidebar
4. Ask me anything about Vedanta, consciousness, or spiritual practice!

How would you like to begin your journey into the profound depths of Vedantic wisdom today? 🙏✨`;
}

// Topic-specific prompt enhancement
export function enhanceTopicPrompt(topicId: string, userQuery: string): string {
  const topicMaps: Record<string, string> = {
    'upanishads-intro': 'the foundational Upanishads and their core teachings about the nature of reality (Brahman) and Self (Atman)',
    'brahman-atman': 'the fundamental Vedantic teaching that Brahman (ultimate reality) and Atman (individual Self) are one and the same',
    'consciousness': 'the nature of consciousness in Vedanta, exploring the different states of awareness and the witness consciousness',
    'self-inquiry': 'the practice of Atma Vichara (Self-inquiry) as taught in Vedanta for direct realization of one\'s true nature',
    'bhagavad-gita': 'the teachings of the Bhagavad Gita, particularly Krishna\'s guidance on dharma, action, and spiritual realization'
  };

  const topicContext = topicMaps[topicId] || 'this important Vedantic topic';
  
  return `In our exploration of ${topicContext}, the student asks: "${userQuery}"

Please provide a comprehensive yet accessible explanation that:
1. Directly addresses their question
2. Connects to relevant scriptural passages
3. Offers practical insights for spiritual practice
4. Encourages deeper contemplation
5. Suggests related concepts to explore further`;
}
