// Announcement Management Service
// Handles announcements, seminars, podcasts, and past events

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: 'seminar' | 'podcast' | 'publication' | 'event' | 'course';
  status: 'upcoming' | 'published' | 'in-development' | 'completed' | 'archived';
  date?: string;
  authors?: string[];
  location?: string;
  url?: string;
  tags: string[];
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    journal?: string;
    format?: string;
    duration?: string;
    registrationRequired?: boolean;
    capacity?: number;
    cost?: string;
    targetAudience?: string[];
    resources?: string[];
  };
}

export interface PastEvent {
  id: string;
  title: string;
  description: string;
  type: 'seminar' | 'workshop' | 'conference' | 'webinar' | 'podcast-episode';
  completedDate: Date;
  participants?: number;
  rating?: number;
  recordings?: string[];
  materials?: string[];
  testimonials?: string[];
  summary?: string;
  keyTakeaways?: string[];
  followUpActions?: string[];
  tags: string[];
  isPubliclyVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class AnnouncementService {
  private static instance: AnnouncementService;
  private announcements: Announcement[] = [];
  private pastEvents: PastEvent[] = [];
  private isInitialized = false;

  private constructor() {
    this.loadFromStorage();
    this.initializeDefaultData();
  }

  public static getInstance(): AnnouncementService {
    if (!AnnouncementService.instance) {
      AnnouncementService.instance = new AnnouncementService();
    }
    return AnnouncementService.instance;
  }

  private initializeDefaultData(): void {
    if (this.isInitialized) return;

    // Initialize with default announcements if none exist
    if (this.announcements.length === 0) {
      this.announcements = [
        {
          id: 'seminar-001',
          title: 'Contemplative Medicine Seminar',
          description: 'A deep dive into integrating contemplative practices with clinical care. Exploring evidence-based approaches to spiritual health in healthcare settings.',
          type: 'seminar',
          status: 'upcoming',
          date: 'Coming Soon',
          authors: ['Dr. Satish Prasad Rath', 'Prof. Prathosh A P'],
          tags: ['healthcare', 'contemplative-medicine', 'academic'],
          priority: 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            format: 'Academic Webinar',
            targetAudience: ['Healthcare Professionals', 'Medical Students', 'Researchers'],
            registrationRequired: true,
            capacity: 500
          }
        },
        {
          id: 'publication-001',
          title: 'AI-Guided Contemplative Learning',
          description: 'Research paper exploring the efficacy of AI-assisted contemplative education in healthcare professional development and patient care enhancement.',
          type: 'publication',
          status: 'published',
          authors: ['Rath, S.P.', 'Prathosh, A.P.', 'et al.'],
          tags: ['research', 'ai', 'contemplative-learning', 'healthcare'],
          priority: 2,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            journal: 'Digital Health & Wellness',
            format: 'Peer-reviewed Article'
          }
        },
        {
          id: 'podcast-001',
          title: 'Wisdom & Wellness Podcast',
          description: 'Monthly discussions on integrating ancient wisdom with modern healthcare. Featuring interviews with leading researchers and practitioners.',
          type: 'podcast',
          status: 'in-development',
          date: 'Q2 2025',
          authors: ['Dr. Rath', 'Prof. Prathosh'],
          tags: ['podcast', 'wisdom', 'wellness', 'healthcare'],
          priority: 3,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            format: 'Monthly Podcast Series',
            targetAudience: ['Healthcare Professionals', 'General Public'],
            resources: ['Spotify', 'Apple Podcasts', 'YouTube']
          }
        }
      ];
    }

    // Initialize with default past events if none exist
    if (this.pastEvents.length === 0) {
      this.pastEvents = [
        {
          id: 'past-001',
          title: 'Introduction to Vedantic AI Teaching',
          description: 'Inaugural workshop on using AI for contemplative education and spiritual health awareness.',
          type: 'workshop',
          completedDate: new Date('2024-12-15'),
          participants: 150,
          rating: 4.8,
          summary: 'Successful introduction to AI-assisted contemplative learning with positive feedback from healthcare professionals.',
          keyTakeaways: [
            'AI can effectively guide contemplative learning',
            'Healthcare professionals show strong interest in spiritual health integration',
            'Need for more structured academic programs'
          ],
          tags: ['ai', 'contemplative-education', 'workshop'],
          isPubliclyVisible: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
    }

    this.saveToStorage();
    this.isInitialized = true;
  }

  // Announcement Management Methods
  public getAnnouncements(): Announcement[] {
    return this.announcements
      .filter(a => a.isActive)
      .sort((a, b) => a.priority - b.priority);
  }

  public getAllAnnouncements(): Announcement[] {
    return [...this.announcements].sort((a, b) => a.priority - b.priority);
  }

  public getAnnouncementById(id: string): Announcement | null {
    return this.announcements.find(a => a.id === id) || null;
  }

  public createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Announcement {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `announcement-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.announcements.push(newAnnouncement);
    this.saveToStorage();
    return newAnnouncement;
  }

  public updateAnnouncement(id: string, updates: Partial<Omit<Announcement, 'id' | 'createdAt'>>): boolean {
    const index = this.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.announcements[index] = {
        ...this.announcements[index],
        ...updates,
        updatedAt: new Date()
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public deleteAnnouncement(id: string): boolean {
    const index = this.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.announcements.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public reorderAnnouncements(fromIndex: number, toIndex: number): void {
    const announcements = this.getAllAnnouncements();
    const [moved] = announcements.splice(fromIndex, 1);
    announcements.splice(toIndex, 0, moved);
    
    // Update priorities
    announcements.forEach((announcement, index) => {
      announcement.priority = index + 1;
      announcement.updatedAt = new Date();
    });
    
    this.announcements = announcements;
    this.saveToStorage();
  }

  // Past Events Management Methods
  public getPastEvents(): PastEvent[] {
    return this.pastEvents
      .filter(e => e.isPubliclyVisible)
      .sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime());
  }

  public getAllPastEvents(): PastEvent[] {
    return [...this.pastEvents].sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime());
  }

  public getPastEventById(id: string): PastEvent | null {
    return this.pastEvents.find(e => e.id === id) || null;
  }

  public createPastEvent(event: Omit<PastEvent, 'id' | 'createdAt' | 'updatedAt'>): PastEvent {
    const newEvent: PastEvent = {
      ...event,
      id: `past-event-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.pastEvents.push(newEvent);
    this.saveToStorage();
    return newEvent;
  }

  public updatePastEvent(id: string, updates: Partial<Omit<PastEvent, 'id' | 'createdAt'>>): boolean {
    const index = this.pastEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      this.pastEvents[index] = {
        ...this.pastEvents[index],
        ...updates,
        updatedAt: new Date()
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public deletePastEvent(id: string): boolean {
    const index = this.pastEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      this.pastEvents.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Utility Methods
  public getAnnouncementsByType(type: Announcement['type']): Announcement[] {
    return this.getAnnouncements().filter(a => a.type === type);
  }

  public getAnnouncementsByStatus(status: Announcement['status']): Announcement[] {
    return this.getAnnouncements().filter(a => a.status === status);
  }

  public searchAnnouncements(query: string): Announcement[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAnnouncements().filter(a =>
      a.title.toLowerCase().includes(lowercaseQuery) ||
      a.description.toLowerCase().includes(lowercaseQuery) ||
      a.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      (a.authors && a.authors.some(author => author.toLowerCase().includes(lowercaseQuery)))
    );
  }

  public searchPastEvents(query: string): PastEvent[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getPastEvents().filter(e =>
      e.title.toLowerCase().includes(lowercaseQuery) ||
      e.description.toLowerCase().includes(lowercaseQuery) ||
      e.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      (e.summary && e.summary.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Data Management
  public exportData(): string {
    return JSON.stringify({
      announcements: this.announcements,
      pastEvents: this.pastEvents,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.announcements) this.announcements = data.announcements;
      if (data.pastEvents) this.pastEvents = data.pastEvents;
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Failed to import announcement data:', error);
      return false;
    }
  }

  // Storage Methods
  private saveToStorage(): void {
    try {
      localStorage.setItem('vedanta-announcements', JSON.stringify({
        announcements: this.announcements,
        pastEvents: this.pastEvents,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to save announcements to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem('vedanta-announcements');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.announcements) {
          this.announcements = data.announcements.map((a: any) => ({
            ...a,
            createdAt: new Date(a.createdAt),
            updatedAt: new Date(a.updatedAt)
          }));
        }
        if (data.pastEvents) {
          this.pastEvents = data.pastEvents.map((e: any) => ({
            ...e,
            completedDate: new Date(e.completedDate),
            createdAt: new Date(e.createdAt),
            updatedAt: new Date(e.updatedAt)
          }));
        }
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Failed to load announcements from storage:', error);
    }
  }

  // Analytics
  public getStats() {
    return {
      totalAnnouncements: this.announcements.length,
      activeAnnouncements: this.announcements.filter(a => a.isActive).length,
      upcomingEvents: this.announcements.filter(a => a.status === 'upcoming').length,
      publishedContent: this.announcements.filter(a => a.status === 'published').length,
      totalPastEvents: this.pastEvents.length,
      publicPastEvents: this.pastEvents.filter(e => e.isPubliclyVisible).length,
      averageEventRating: this.pastEvents.reduce((sum, e) => sum + (e.rating || 0), 0) / this.pastEvents.filter(e => e.rating).length || 0,
      totalParticipants: this.pastEvents.reduce((sum, e) => sum + (e.participants || 0), 0)
    };
  }
}

export default AnnouncementService;
