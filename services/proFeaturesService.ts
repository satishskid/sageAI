// Pro Features Management Service
export interface ProFeature {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'functionality' | 'support' | 'analytics' | 'customization';
  enabled: boolean;
  requiresPayment: boolean;
  stripeProductId?: string;
  minimumPlan: 'free' | 'pro' | 'enterprise';
}

export interface ProModule {
  id: string;
  name: string;
  description: string;
  features: string[];
  enabled: boolean;
  requiresPayment: boolean;
  minimumPlan: 'free' | 'pro' | 'enterprise';
  component?: string;
  route?: string;
}

class ProFeaturesService {
  private static instance: ProFeaturesService;
  private proFeatures: ProFeature[] = [];
  private proModules: ProModule[] = [];

  private constructor() {
    this.initializeProFeatures();
    this.initializeProModules();
  }

  public static getInstance(): ProFeaturesService {
    if (!ProFeaturesService.instance) {
      ProFeaturesService.instance = new ProFeaturesService();
    }
    return ProFeaturesService.instance;
  }

  private initializeProFeatures(): void {
    this.proFeatures = [
      // Content Features
      {
        id: 'unlimited-messages',
        name: 'Unlimited Messages',
        description: 'Send unlimited messages to Professor Arya',
        category: 'content',
        enabled: false, // Will be enabled after payment
        requiresPayment: true,
        minimumPlan: 'pro',
        stripeProductId: 'prod_unlimited_messages'
      },
      {
        id: 'advanced-courses',
        name: 'Advanced Courses',
        description: 'Access to advanced Vedanta and Sanskrit courses',
        category: 'content',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        stripeProductId: 'prod_advanced_courses'
      },
      {
        id: 'premium-content',
        name: 'Premium Content Library',
        description: 'Exclusive texts, commentaries, and interpretations',
        category: 'content',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'sanskrit-dictionary',
        name: 'Interactive Sanskrit Dictionary',
        description: 'Advanced Sanskrit word lookup with etymology',
        category: 'content',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },

      // Functionality Features
      {
        id: 'priority-api',
        name: 'Priority API Access',
        description: 'Faster response times with priority queue',
        category: 'functionality',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'conversation-history',
        name: 'Conversation History',
        description: 'Save and search through your learning conversations',
        category: 'functionality',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'offline-mode',
        name: 'Offline Learning Mode',
        description: 'Download content for offline study',
        category: 'functionality',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'custom-learning-path',
        name: 'Personalized Learning Path',
        description: 'AI-curated learning journey based on your progress',
        category: 'functionality',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },

      // Support Features
      {
        id: 'priority-support',
        name: 'Priority Email Support',
        description: '24-hour response time for support queries',
        category: 'support',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'live-sessions',
        name: 'Monthly Live Q&A Sessions',
        description: 'Join monthly live sessions with Vedanta experts',
        category: 'support',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },

      // Analytics Features
      {
        id: 'learning-analytics',
        name: 'Learning Progress Analytics',
        description: 'Detailed insights into your learning journey',
        category: 'analytics',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'knowledge-graph',
        name: 'Personal Knowledge Graph',
        description: 'Visual map of your Vedantic knowledge connections',
        category: 'analytics',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },

      // Customization Features
      {
        id: 'custom-themes',
        name: 'Custom Themes',
        description: 'Personalize your learning environment',
        category: 'customization',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro'
      },
      {
        id: 'jagannatha-tatva-access',
        name: 'Jagannatha Tatva Module',
        description: 'Complete access to sacred Jagannatha wisdom with scientific correlations',
        category: 'content',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        stripeProductId: 'prod_jagannatha_tatva'
      },
      {
        id: 'api-integrations',
        name: 'Third-party Integrations',
        description: 'Connect with note-taking and productivity apps',
        category: 'customization',
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'enterprise'
      }
    ];
  }

  private initializeProModules(): void {
    this.proModules = [
      {
        id: 'advanced-sanskrit',
        name: 'Advanced Sanskrit Module',
        description: 'Deep dive into Sanskrit grammar, etymology, and classical texts',
        features: ['sanskrit-dictionary', 'premium-content'],
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        component: 'AdvancedSanskritModule',
        route: '/learn/advanced-sanskrit'
      },
      {
        id: 'meditation-tracker',
        name: 'Meditation & Practice Tracker',
        description: 'Track your meditation sessions and spiritual practices',
        features: ['learning-analytics', 'custom-learning-path'],
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        component: 'MeditationTracker',
        route: '/practice/meditation'
      },
      {
        id: 'community-access',
        name: 'Premium Community Access',
        description: 'Join exclusive discussions with fellow practitioners',
        features: ['live-sessions', 'priority-support'],
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        component: 'CommunityModule',
        route: '/community'
      },
      {
        id: 'personal-guru',
        name: 'Personal AI Guru Sessions',
        description: 'One-on-one extended sessions with Professor Arya',
        features: ['unlimited-messages', 'priority-api', 'conversation-history'],
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        component: 'PersonalGuruModule',
        route: '/guru/personal'
      },
      {
        id: 'enterprise-dashboard',
        name: 'Enterprise Analytics Dashboard',
        description: 'Advanced analytics and user management for institutions',
        features: ['learning-analytics', 'api-integrations', 'knowledge-graph'],
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'enterprise',
        component: 'EnterpriseDashboard',
        route: '/enterprise/dashboard'
      },
      {
        id: 'jagannatha-tatva-module',
        name: 'Jagannatha Tatva: Sacred Wisdom Module',
        description: 'Complete exploration of Jagannatha philosophy with Vedantic sources and modern scientific correlations',
        features: ['jagannatha-tatva-access', 'premium-content', 'sanskrit-dictionary'],
        enabled: false,
        requiresPayment: true,
        minimumPlan: 'pro',
        component: 'JagannathaTatvaModule',
        route: '/jagannatha-tatva'
      }
    ];
  }

  // Feature Management Methods
  public getProFeatures(): ProFeature[] {
    return [...this.proFeatures];
  }

  public getProModules(): ProModule[] {
    return [...this.proModules];
  }

  public isFeatureEnabled(featureId: string): boolean {
    const feature = this.proFeatures.find(f => f.id === featureId);
    return feature ? feature.enabled : false;
  }

  public isModuleEnabled(moduleId: string): boolean {
    const module = this.proModules.find(m => m.id === moduleId);
    return module ? module.enabled : false;
  }

  public enableFeature(featureId: string): boolean {
    const feature = this.proFeatures.find(f => f.id === featureId);
    if (feature) {
      feature.enabled = true;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public enableModule(moduleId: string): boolean {
    const module = this.proModules.find(m => m.id === moduleId);
    if (module) {
      module.enabled = true;
      // Also enable all required features
      module.features.forEach(featureId => {
        this.enableFeature(featureId);
      });
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public disableFeature(featureId: string): boolean {
    const feature = this.proFeatures.find(f => f.id === featureId);
    if (feature) {
      feature.enabled = false;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public disableModule(moduleId: string): boolean {
    const module = this.proModules.find(m => m.id === moduleId);
    if (module) {
      module.enabled = false;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Payment Integration Methods
  public activateProPlan(): void {
    // Enable all Pro features
    this.proFeatures
      .filter(f => f.minimumPlan === 'pro')
      .forEach(f => f.enabled = true);
    
    // Enable all Pro modules
    this.proModules
      .filter(m => m.minimumPlan === 'pro')
      .forEach(m => m.enabled = true);
    
    this.saveToStorage();
    console.log('✅ Pro plan activated - all Pro features enabled');
  }

  public activateEnterprisePlan(): void {
    // Enable all features (Pro + Enterprise)
    this.proFeatures.forEach(f => f.enabled = true);
    this.proModules.forEach(m => m.enabled = true);
    
    this.saveToStorage();
    console.log('✅ Enterprise plan activated - all features enabled');
  }

  public deactivateProFeatures(): void {
    // Disable all paid features
    this.proFeatures
      .filter(f => f.requiresPayment)
      .forEach(f => f.enabled = false);
    
    this.proModules
      .filter(m => m.requiresPayment)
      .forEach(m => m.enabled = false);
    
    this.saveToStorage();
    console.log('❌ Pro features deactivated - reverted to free tier');
  }

  // User Plan Check Methods
  public canAccessFeature(featureId: string, userPlan: 'free' | 'pro' | 'enterprise'): boolean {
    const feature = this.proFeatures.find(f => f.id === featureId);
    if (!feature) return false;
    
    if (!feature.requiresPayment) return true;
    
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 };
    return planHierarchy[userPlan] >= planHierarchy[feature.minimumPlan];
  }

  public canAccessModule(moduleId: string, userPlan: 'free' | 'pro' | 'enterprise'): boolean {
    const module = this.proModules.find(m => m.id === moduleId);
    if (!module) return false;
    
    if (!module.requiresPayment) return true;
    
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 };
    return planHierarchy[userPlan] >= planHierarchy[module.minimumPlan];
  }

  // Storage Methods
  private saveToStorage(): void {
    try {
      localStorage.setItem('vedanta-pro-features', JSON.stringify({
        features: this.proFeatures,
        modules: this.proModules,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to save Pro features to storage:', error);
    }
  }

  public loadFromStorage(): void {
    try {
      const saved = localStorage.getItem('vedanta-pro-features');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.features) this.proFeatures = data.features;
        if (data.modules) this.proModules = data.modules;
      }
    } catch (error) {
      console.error('Failed to load Pro features from storage:', error);
    }
  }

  // Admin Methods
  public getFeaturesByCategory(category: ProFeature['category']): ProFeature[] {
    return this.proFeatures.filter(f => f.category === category);
  }

  public getModulesByPlan(plan: 'free' | 'pro' | 'enterprise'): ProModule[] {
    return this.proModules.filter(m => m.minimumPlan === plan);
  }

  public exportConfiguration(): string {
    return JSON.stringify({
      features: this.proFeatures,
      modules: this.proModules,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }
}

export default ProFeaturesService;
