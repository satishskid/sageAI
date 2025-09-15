// Configuration service for managing APIs and payment plans
export interface APIConfiguration {
  id: string;
  name: string;
  provider: 'gemini' | 'groq' | 'openrouter' | 'huggingface' | 'cohere' | 'together' | 'custom';
  apiKey: string;
  model: string;
  baseURL?: string;
  enabled: boolean;
  priority: number; // Lower number = higher priority
  maxTokens: number;
  temperature: number;
  description: string;
  costPerToken?: number;
  rateLimit?: number;
}

export interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  messageLimit: number; // -1 for unlimited
  apiAccess: string[]; // API IDs this plan can access
  priority: boolean; // Gets priority API access
  stripePriceId?: string;
  enabled: boolean;
  popular?: boolean;
}

class ConfigurationService {
  private static instance: ConfigurationService;
  private apiConfigs: APIConfiguration[] = [];
  private paymentPlans: PaymentPlan[] = [];

  private constructor() {
    this.loadDefaultConfigurations();
  }

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }
    return ConfigurationService.instance;
  }

  private loadDefaultConfigurations(): void {
    // Load from localStorage or set defaults
    const savedAPIs = localStorage.getItem('vedanta-api-configs');
    const savedPlans = localStorage.getItem('vedanta-payment-plans');

    if (savedAPIs) {
      this.apiConfigs = JSON.parse(savedAPIs);
    } else {
      this.setDefaultAPIConfigs();
    }

    if (savedPlans) {
      this.paymentPlans = JSON.parse(savedPlans);
    } else {
      this.setDefaultPaymentPlans();
    }
  }

  private setDefaultAPIConfigs(): void {
    this.apiConfigs = [
      {
        id: 'gemini-primary',
        name: 'Gemini 1.5 Flash',
        provider: 'gemini',
        apiKey: 'AIzaSyDRnxan8o-NtkxbcAm9lhG3bn1EcuEq82E',
        model: 'gemini-1.5-flash',
        enabled: true,
        priority: 1,
        maxTokens: 2048,
        temperature: 0.7,
        description: 'Google\'s fast and capable model, best for Vedic content',
        costPerToken: 0.00015,
        rateLimit: 60
      },
      {
        id: 'groq-fallback',
        name: 'Groq Llama 3.1',
        provider: 'groq',
        apiKey: import.meta.env.VITE_GROQ_API_KEY || 'your-groq-api-key-here',
        model: 'llama-3.1-8b-instant',
        enabled: true,
        priority: 2,
        maxTokens: 2048,
        temperature: 0.7,
        description: 'Very fast inference, excellent fallback option',
        costPerToken: 0.00005,
        rateLimit: 100
      },
      {
        id: 'openrouter-backup',
        name: 'OpenRouter DeepSeek',
        provider: 'openrouter',
        apiKey: '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',
        model: 'deepseek/deepseek-chat',
        baseURL: 'https://openrouter.ai/api/v1',
        enabled: true,
        priority: 3,
        maxTokens: 2048,
        temperature: 0.7,
        description: 'Reliable backup with good analytical capabilities',
        costPerToken: 0.00014,
        rateLimit: 50
      }
    ];
    this.saveAPIConfigs();
  }

  private setDefaultPaymentPlans(): void {
    this.paymentPlans = [
      {
        id: 'free',
        name: 'Free Tier',
        description: 'Perfect for getting started with Vedic learning',
        price: 0,
        currency: 'usd',
        interval: 'month',
        features: [
          '10 messages per day',
          'Basic course access',
          'Community support',
          'Standard API access'
        ],
        messageLimit: 10,
        apiAccess: ['groq-fallback', 'openrouter-backup'],
        priority: false,
        enabled: true
      },
      {
        id: 'pro-usd',
        name: 'Sage Pass Pro (USD)',
        description: 'Unlimited learning with premium features',
        price: 1999, // $19.99
        currency: 'usd',
        interval: 'month',
        features: [
          'Unlimited messages',
          'Premium course content',
          'Priority API access',
          'Advanced workshops',
          'Personal learning path',
          'Email support'
        ],
        messageLimit: -1,
        apiAccess: ['gemini-primary', 'groq-fallback', 'openrouter-backup'],
        priority: true,
        enabled: true,
        popular: true
      },
      {
        id: 'pro-inr',
        name: 'Sage Pass Pro (INR)',
        description: 'Unlimited learning with premium features - India pricing',
        price: 149900, // ₹1499
        currency: 'inr',
        interval: 'month',
        features: [
          'Unlimited messages',
          'Premium course content',
          'Priority API access',
          'Advanced workshops',
          'Personal learning path',
          'Email support',
          'India-specific content'
        ],
        messageLimit: -1,
        apiAccess: ['gemini-primary', 'groq-fallback', 'openrouter-backup'],
        priority: true,
        enabled: true,
        popular: true
      },
      {
        id: 'enterprise-usd',
        name: 'Enterprise (USD)',
        description: 'For institutions and advanced practitioners',
        price: 4999, // $49.99
        currency: 'usd',
        interval: 'month',
        features: [
          'Everything in Pro',
          'Custom API configurations',
          'White-label options',
          'Dedicated support',
          'Analytics dashboard',
          'Custom integrations'
        ],
        messageLimit: -1,
        apiAccess: ['gemini-primary', 'groq-fallback', 'openrouter-backup'],
        priority: true,
        enabled: true
      },
      {
        id: 'enterprise-inr',
        name: 'Enterprise (INR)',
        description: 'For Indian institutions and advanced practitioners',
        price: 399900, // ₹3999
        currency: 'inr',
        interval: 'month',
        features: [
          'Everything in Pro',
          'Custom API configurations',
          'White-label options',
          'Dedicated support',
          'Analytics dashboard',
          'Custom integrations',
          'India-specific features',
          'Local language support'
        ],
        messageLimit: -1,
        apiAccess: ['gemini-primary', 'groq-fallback', 'openrouter-backup'],
        priority: true,
        enabled: true
      }
    ];
    this.savePaymentPlans();
  }

  // API Management Methods
  public getAPIConfigs(): APIConfiguration[] {
    return [...this.apiConfigs].sort((a, b) => a.priority - b.priority);
  }

  public addAPIConfig(config: Omit<APIConfiguration, 'id'>): APIConfiguration {
    const newConfig: APIConfiguration = {
      ...config,
      id: `api-${Date.now()}`
    };
    this.apiConfigs.push(newConfig);
    this.saveAPIConfigs();
    return newConfig;
  }

  public updateAPIConfig(id: string, updates: Partial<APIConfiguration>): boolean {
    const index = this.apiConfigs.findIndex(api => api.id === id);
    if (index !== -1) {
      this.apiConfigs[index] = { ...this.apiConfigs[index], ...updates };
      this.saveAPIConfigs();
      return true;
    }
    return false;
  }

  public deleteAPIConfig(id: string): boolean {
    const index = this.apiConfigs.findIndex(api => api.id === id);
    if (index !== -1) {
      this.apiConfigs.splice(index, 1);
      this.saveAPIConfigs();
      return true;
    }
    return false;
  }

  public reorderAPIConfigs(fromIndex: number, toIndex: number): void {
    const configs = this.getAPIConfigs();
    const [moved] = configs.splice(fromIndex, 1);
    configs.splice(toIndex, 0, moved);
    
    // Update priorities
    configs.forEach((config, index) => {
      config.priority = index + 1;
    });
    
    this.apiConfigs = configs;
    this.saveAPIConfigs();
  }

  // Payment Plan Management Methods
  public getPaymentPlans(): PaymentPlan[] {
    return this.paymentPlans.filter(plan => plan.enabled);
  }

  public getAllPaymentPlans(): PaymentPlan[] {
    return [...this.paymentPlans];
  }

  public addPaymentPlan(plan: Omit<PaymentPlan, 'id'>): PaymentPlan {
    const newPlan: PaymentPlan = {
      ...plan,
      id: `plan-${Date.now()}`
    };
    this.paymentPlans.push(newPlan);
    this.savePaymentPlans();
    return newPlan;
  }

  public updatePaymentPlan(id: string, updates: Partial<PaymentPlan>): boolean {
    const index = this.paymentPlans.findIndex(plan => plan.id === id);
    if (index !== -1) {
      this.paymentPlans[index] = { ...this.paymentPlans[index], ...updates };
      this.savePaymentPlans();
      return true;
    }
    return false;
  }

  public deletePaymentPlan(id: string): boolean {
    const index = this.paymentPlans.findIndex(plan => plan.id === id);
    if (index !== -1) {
      this.paymentPlans.splice(index, 1);
      this.savePaymentPlans();
      return true;
    }
    return false;
  }

  // Persistence Methods
  private saveAPIConfigs(): void {
    localStorage.setItem('vedanta-api-configs', JSON.stringify(this.apiConfigs));
  }

  private savePaymentPlans(): void {
    localStorage.setItem('vedanta-payment-plans', JSON.stringify(this.paymentPlans));
  }

  // Utility Methods
  public getEnabledAPIsForPlan(planId: string): APIConfiguration[] {
    const plan = this.paymentPlans.find(p => p.id === planId);
    if (!plan) return [];
    
    return this.getAPIConfigs()
      .filter(api => api.enabled && plan.apiAccess.includes(api.id));
  }

  public exportConfiguration(): string {
    return JSON.stringify({
      apis: this.apiConfigs,
      plans: this.paymentPlans,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  public importConfiguration(configJson: string): boolean {
    try {
      const config = JSON.parse(configJson);
      if (config.apis && config.plans) {
        this.apiConfigs = config.apis;
        this.paymentPlans = config.plans;
        this.saveAPIConfigs();
        this.savePaymentPlans();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import configuration:', error);
      return false;
    }
  }
}

export default ConfigurationService;
