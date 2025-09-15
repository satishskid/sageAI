import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import OpenAI from "openai";

export interface APIHealthStatus {
  name: string;
  status: 'healthy' | 'unhealthy' | 'checking';
  responseTime: number;
  lastChecked: Date;
  error?: string;
  model?: string;
}

export interface HealthCheckResult {
  gemini: APIHealthStatus;
  groq: APIHealthStatus;
  openrouter: APIHealthStatus;
  overall: 'healthy' | 'degraded' | 'unhealthy';
}

class HealthCheckService {
  private static instance: HealthCheckService;
  private healthStatus: HealthCheckResult;
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.healthStatus = {
      gemini: {
        name: 'Gemini API',
        status: 'checking',
        responseTime: 0,
        lastChecked: new Date(),
        model: 'gemini-1.5-flash'
      },
      groq: {
        name: 'Groq API',
        status: 'checking',
        responseTime: 0,
        lastChecked: new Date(),
        model: 'llama-3.1-70b-versatile'
      },
      openrouter: {
        name: 'OpenRouter API',
        status: 'checking',
        responseTime: 0,
        lastChecked: new Date(),
        model: 'deepseek/deepseek-chat'
      },
      overall: 'unhealthy'
    };
  }

  public static getInstance(): HealthCheckService {
    if (!HealthCheckService.instance) {
      HealthCheckService.instance = new HealthCheckService();
    }
    return HealthCheckService.instance;
  }

  public async checkGeminiHealth(): Promise<APIHealthStatus> {
    const startTime = Date.now();
    const status: APIHealthStatus = {
      name: 'Gemini API',
      status: 'checking',
      responseTime: 0,
      lastChecked: new Date(),
      model: 'gemini-1.5-flash'
    };

    try {
      const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDRnxan8o-NtkxbcAm9lhG3bn1EcuEq82E";
      
      if (!GEMINI_API_KEY || !GEMINI_API_KEY.startsWith("AIza")) {
        throw new Error("Invalid API key");
      }

      const ai = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // Simple health check with minimal token usage
      const response = await model.generateContent("Health check. Respond with just 'OK'.");

      if (response.response.text() && response.response.text().includes('OK')) {
        status.status = 'healthy';
      } else {
        status.status = 'unhealthy';
        status.error = 'Unexpected response';
      }
    } catch (error: any) {
      status.status = 'unhealthy';
      status.error = error.message || 'Unknown error';
    }

    status.responseTime = Date.now() - startTime;
    status.lastChecked = new Date();
    return status;
  }

  public async checkGroqHealth(): Promise<APIHealthStatus> {
    const startTime = Date.now();
    const status: APIHealthStatus = {
      name: 'Groq API',
      status: 'checking',
      responseTime: 0,
      lastChecked: new Date(),
      model: 'llama-3.1-70b-versatile'
    };

    try {
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "your-groq-api-key-here";
      
      if (!GROQ_API_KEY || !GROQ_API_KEY.startsWith("gsk_")) {
        throw new Error("Invalid API key");
      }

      const groq = new Groq({ 
        apiKey: GROQ_API_KEY,
        dangerouslyAllowBrowser: true 
      });
      
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: 'Health check. Respond with just "OK".' }],
        model: "llama-3.1-70b-versatile",
        max_tokens: 10,
        temperature: 0
      });

      if (response.choices[0]?.message?.content?.includes('OK')) {
        status.status = 'healthy';
      } else {
        status.status = 'unhealthy';
        status.error = 'Unexpected response';
      }
    } catch (error: any) {
      status.status = 'unhealthy';
      status.error = error.message || 'Unknown error';
    }

    status.responseTime = Date.now() - startTime;
    status.lastChecked = new Date();
    return status;
  }

  public async checkOpenRouterHealth(): Promise<APIHealthStatus> {
    const startTime = Date.now();
    const status: APIHealthStatus = {
      name: 'OpenRouter API',
      status: 'checking',
      responseTime: 0,
      lastChecked: new Date(),
      model: 'deepseek/deepseek-chat'
    };

    try {
      const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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";
      
      if (!OPENROUTER_API_KEY || !OPENROUTER_API_KEY.startsWith("sk-or-")) {
        throw new Error("Invalid API key");
      }

      const openrouter = new OpenAI({
        apiKey: OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        dangerouslyAllowBrowser: true
      });
      
      const response = await openrouter.chat.completions.create({
        messages: [{ role: 'user', content: 'Health check. Respond with just "OK".' }],
        model: "deepseek/deepseek-chat",
        max_tokens: 10,
        temperature: 0
      });

      if (response.choices[0]?.message?.content?.includes('OK')) {
        status.status = 'healthy';
      } else {
        status.status = 'unhealthy';
        status.error = 'Unexpected response';
      }
    } catch (error: any) {
      status.status = 'unhealthy';
      status.error = error.message || 'Unknown error';
    }

    status.responseTime = Date.now() - startTime;
    status.lastChecked = new Date();
    return status;
  }

  public async performFullHealthCheck(): Promise<HealthCheckResult> {
    console.log('🔍 Performing health check on all APIs...');
    
    const [geminiStatus, groqStatus, openrouterStatus] = await Promise.all([
      this.checkGeminiHealth(),
      this.checkGroqHealth(),
      this.checkOpenRouterHealth()
    ]);

    // Determine overall health
    const healthyCount = [geminiStatus, groqStatus, openrouterStatus]
      .filter(status => status.status === 'healthy').length;
    
    let overall: 'healthy' | 'degraded' | 'unhealthy';
    if (healthyCount === 3) {
      overall = 'healthy';
    } else if (healthyCount >= 1) {
      overall = 'degraded';
    } else {
      overall = 'unhealthy';
    }

    this.healthStatus = {
      gemini: geminiStatus,
      groq: groqStatus,
      openrouter: openrouterStatus,
      overall
    };

    console.log(`✅ Health check complete. Overall status: ${overall}`);
    return this.healthStatus;
  }

  public getLastHealthStatus(): HealthCheckResult {
    return this.healthStatus;
  }

  public startPeriodicHealthChecks(intervalMinutes: number = 5): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // Perform initial check
    this.performFullHealthCheck();

    // Set up periodic checks
    this.checkInterval = setInterval(() => {
      this.performFullHealthCheck();
    }, intervalMinutes * 60 * 1000);

    console.log(`🔄 Started periodic health checks every ${intervalMinutes} minutes`);
  }

  public stopPeriodicHealthChecks(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('⏹️ Stopped periodic health checks');
    }
  }
}

export default HealthCheckService;
