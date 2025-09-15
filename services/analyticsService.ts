// Real analytics service for tracking actual usage
interface UserSession {
  userId: string;
  sessionStart: Date;
  lastActivity: Date;
  messageCount: number;
  apiProvider: string;
}

interface APIUsageStats {
  gemini: number;
  groq: number;
  openrouter: number;
}

interface RealUserStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  messagesThisMonth: number;
  messagesThisSession: number;
  apiUsage: APIUsageStats;
  sessionDuration: number;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private activeSessions: Map<string, UserSession> = new Map();
  private monthlyMessageCount: number = 0;
  private sessionMessageCount: number = 0;
  private apiUsageCount: APIUsageStats = { gemini: 0, groq: 0, openrouter: 0 };
  private startTime: Date = new Date();

  private constructor() {
    // Load persisted data from localStorage
    this.loadPersistedData();
    
    // Clean up inactive sessions every 5 minutes
    setInterval(() => this.cleanupInactiveSessions(), 5 * 60 * 1000);
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private loadPersistedData(): void {
    try {
      const saved = localStorage.getItem('vedanta-analytics');
      if (saved) {
        const data = JSON.parse(saved);
        this.monthlyMessageCount = data.monthlyMessageCount || 0;
        this.apiUsageCount = data.apiUsage || { gemini: 0, groq: 0, openrouter: 0 };
        
        // Reset monthly count if it's a new month
        const lastSaved = new Date(data.lastSaved || 0);
        const now = new Date();
        if (lastSaved.getMonth() !== now.getMonth() || lastSaved.getFullYear() !== now.getFullYear()) {
          this.monthlyMessageCount = 0;
        }
      }
    } catch (error) {
      console.warn('Failed to load analytics data:', error);
    }
  }

  private persistData(): void {
    try {
      const data = {
        monthlyMessageCount: this.monthlyMessageCount,
        apiUsage: this.apiUsageCount,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('vedanta-analytics', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to persist analytics data:', error);
    }
  }

  public trackUserSession(userId: string): void {
    const now = new Date();
    
    if (this.activeSessions.has(userId)) {
      // Update existing session
      const session = this.activeSessions.get(userId)!;
      session.lastActivity = now;
    } else {
      // Create new session
      this.activeSessions.set(userId, {
        userId,
        sessionStart: now,
        lastActivity: now,
        messageCount: 0,
        apiProvider: 'none'
      });
    }
  }

  public trackMessage(userId: string, apiProvider: 'gemini' | 'groq' | 'openrouter'): void {
    // Update session
    if (this.activeSessions.has(userId)) {
      const session = this.activeSessions.get(userId)!;
      session.messageCount++;
      session.apiProvider = apiProvider;
      session.lastActivity = new Date();
    }

    // Update global counters
    this.monthlyMessageCount++;
    this.sessionMessageCount++;
    this.apiUsageCount[apiProvider]++;

    // Persist data
    this.persistData();

    console.log(`📊 Message tracked: ${apiProvider} (Total this month: ${this.monthlyMessageCount})`);
  }

  public trackAPIUsage(provider: 'gemini' | 'groq' | 'openrouter'): void {
    this.apiUsageCount[provider]++;
    this.persistData();
  }

  private cleanupInactiveSessions(): void {
    const now = new Date();
    const inactiveThreshold = 30 * 60 * 1000; // 30 minutes

    for (const [userId, session] of this.activeSessions.entries()) {
      if (now.getTime() - session.lastActivity.getTime() > inactiveThreshold) {
        this.activeSessions.delete(userId);
      }
    }
  }

  public getRealUserStats(): RealUserStats {
    const now = new Date();
    const sessionDuration = Math.floor((now.getTime() - this.startTime.getTime()) / 1000 / 60); // minutes

    // Count unique users (in a real app, this would come from Clerk)
    const totalUsers = Math.max(1, this.activeSessions.size); // At least 1 (current user)
    const activeUsers = this.activeSessions.size;
    
    // Premium users would come from Clerk metadata
    const premiumUsers = Array.from(this.activeSessions.values())
      .filter(session => session.userId.includes('premium')).length; // Simplified check

    return {
      totalUsers,
      activeUsers,
      premiumUsers,
      messagesThisMonth: this.monthlyMessageCount,
      messagesThisSession: this.sessionMessageCount,
      apiUsage: { ...this.apiUsageCount },
      sessionDuration
    };
  }

  public getActiveSessionsDetails(): UserSession[] {
    return Array.from(this.activeSessions.values());
  }

  public resetSessionStats(): void {
    this.sessionMessageCount = 0;
    this.startTime = new Date();
  }

  public exportAnalytics(): string {
    const stats = this.getRealUserStats();
    const sessions = this.getActiveSessionsDetails();
    
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      stats,
      sessions,
      uptime: Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000 / 60)
    }, null, 2);
  }
}

export default AnalyticsService;
