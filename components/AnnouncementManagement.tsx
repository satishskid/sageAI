import React, { useState, useEffect } from 'react';
import AnnouncementService, { Announcement, PastEvent } from '../services/announcementService';

const AnnouncementManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'announcements' | 'past-events' | 'stats'>('announcements');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<any>({});

  const announcementService = AnnouncementService.getInstance();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAnnouncements(announcementService.getAllAnnouncements());
    setPastEvents(announcementService.getAllPastEvents());
    setStats(announcementService.getStats());
  };

  const handleCreateAnnouncement = (formData: any) => {
    const newAnnouncement = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: formData.status,
      date: formData.date,
      authors: formData.authors ? formData.authors.split(',').map((a: string) => a.trim()) : [],
      location: formData.location,
      url: formData.url,
      tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()) : [],
      priority: parseInt(formData.priority) || 1,
      isActive: formData.isActive,
      metadata: {
        journal: formData.journal,
        format: formData.format,
        duration: formData.duration,
        registrationRequired: formData.registrationRequired,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        cost: formData.cost,
        targetAudience: formData.targetAudience ? formData.targetAudience.split(',').map((a: string) => a.trim()) : [],
        resources: formData.resources ? formData.resources.split(',').map((r: string) => r.trim()) : []
      }
    };

    announcementService.createAnnouncement(newAnnouncement);
    loadData();
    setIsCreating(false);
  };

  const handleUpdateAnnouncement = (id: string, formData: any) => {
    const updates = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: formData.status,
      date: formData.date,
      authors: formData.authors ? formData.authors.split(',').map((a: string) => a.trim()) : [],
      location: formData.location,
      url: formData.url,
      tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()) : [],
      priority: parseInt(formData.priority) || 1,
      isActive: formData.isActive,
      metadata: {
        journal: formData.journal,
        format: formData.format,
        duration: formData.duration,
        registrationRequired: formData.registrationRequired,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        cost: formData.cost,
        targetAudience: formData.targetAudience ? formData.targetAudience.split(',').map((a: string) => a.trim()) : [],
        resources: formData.resources ? formData.resources.split(',').map((r: string) => r.trim()) : []
      }
    };

    announcementService.updateAnnouncement(id, updates);
    loadData();
    setIsEditing(null);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      announcementService.deleteAnnouncement(id);
      loadData();
    }
  };

  const handleCreatePastEvent = (formData: any) => {
    const newEvent = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      completedDate: new Date(formData.completedDate),
      participants: formData.participants ? parseInt(formData.participants) : undefined,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      recordings: formData.recordings ? formData.recordings.split(',').map((r: string) => r.trim()) : [],
      materials: formData.materials ? formData.materials.split(',').map((m: string) => m.trim()) : [],
      testimonials: formData.testimonials ? formData.testimonials.split('\n').filter((t: string) => t.trim()) : [],
      summary: formData.summary,
      keyTakeaways: formData.keyTakeaways ? formData.keyTakeaways.split('\n').filter((k: string) => k.trim()) : [],
      followUpActions: formData.followUpActions ? formData.followUpActions.split('\n').filter((f: string) => f.trim()) : [],
      tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()) : [],
      isPubliclyVisible: formData.isPubliclyVisible
    };

    announcementService.createPastEvent(newEvent);
    loadData();
    setIsCreating(false);
  };

  const filteredAnnouncements = searchQuery
    ? announcementService.searchAnnouncements(searchQuery)
    : announcements;

  const filteredPastEvents = searchQuery
    ? announcementService.searchPastEvents(searchQuery)
    : pastEvents;

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'in-development': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'archived': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seminar': return '🎓';
      case 'podcast': return '🎙️';
      case 'publication': return '📚';
      case 'event': return '🗓️';
      case 'course': return '📖';
      case 'workshop': return '🛠️';
      case 'conference': return '🏛️';
      case 'webinar': return '💻';
      case 'podcast-episode': return '🎧';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-vedic-accent-dark">Announcement Management</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search announcements and events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
          />
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
          >
            + New {activeTab === 'announcements' ? 'Announcement' : 'Past Event'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-vedic-border">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'announcements', label: 'Announcements', icon: '📢' },
            { id: 'past-events', label: 'Past Events', icon: '📅' },
            { id: 'stats', label: 'Statistics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-vedic-accent text-vedic-accent'
                  : 'border-transparent text-vedic-secondary-text hover:text-vedic-primary-text hover:border-vedic-border'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg border border-vedic-border p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(announcement.type)}</span>
                    <h3 className="text-xl font-semibold text-vedic-accent-dark">{announcement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(announcement.status)}`}>
                      {announcement.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {announcement.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-vedic-secondary-text mb-3">{announcement.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {announcement.date && (
                      <div>
                        <span className="font-medium">Date:</span> {announcement.date}
                      </div>
                    )}
                    {announcement.authors && announcement.authors.length > 0 && (
                      <div>
                        <span className="font-medium">Authors:</span> {announcement.authors.join(', ')}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Priority:</span> {announcement.priority}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {announcement.type}
                    </div>
                  </div>

                  {announcement.tags.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {announcement.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-vedic-bg text-vedic-accent text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setIsEditing(announcement.id)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Events Tab */}
      {activeTab === 'past-events' && (
        <div className="space-y-4">
          {filteredPastEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg border border-vedic-border p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(event.type)}</span>
                    <h3 className="text-xl font-semibold text-vedic-accent-dark">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.isPubliclyVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {event.isPubliclyVisible ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <p className="text-vedic-secondary-text mb-3">{event.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="font-medium">Completed:</span> {event.completedDate.toLocaleDateString()}
                    </div>
                    {event.participants && (
                      <div>
                        <span className="font-medium">Participants:</span> {event.participants}
                      </div>
                    )}
                    {event.rating && (
                      <div>
                        <span className="font-medium">Rating:</span> {event.rating}/5 ⭐
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Type:</span> {event.type}
                    </div>
                  </div>

                  {event.summary && (
                    <div className="mb-3">
                      <span className="font-medium text-sm">Summary:</span>
                      <p className="text-sm text-vedic-secondary-text mt-1">{event.summary}</p>
                    </div>
                  )}

                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-vedic-bg text-vedic-accent text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setIsEditing(event.id)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => announcementService.deletePastEvent(event.id) && loadData()}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Total Announcements</h3>
            <p className="text-3xl font-bold text-vedic-accent">{stats.totalAnnouncements}</p>
            <p className="text-sm text-vedic-secondary-text">{stats.activeAnnouncements} active</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.upcomingEvents}</p>
            <p className="text-sm text-vedic-secondary-text">Scheduled</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Published Content</h3>
            <p className="text-3xl font-bold text-green-600">{stats.publishedContent}</p>
            <p className="text-sm text-vedic-secondary-text">Live content</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Past Events</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalPastEvents}</p>
            <p className="text-sm text-vedic-secondary-text">{stats.publicPastEvents} public</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Total Participants</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.totalParticipants}</p>
            <p className="text-sm text-vedic-secondary-text">All events</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.averageEventRating?.toFixed(1) || 'N/A'}</p>
            <p className="text-sm text-vedic-secondary-text">Out of 5</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-vedic-accent-dark mb-4">Data Management</h3>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const data = announcementService.exportData();
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `announcements-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                }}
                className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
              >
                Export Data
              </button>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const content = e.target?.result as string;
                      if (announcementService.importData(content)) {
                        loadData();
                        alert('Data imported successfully!');
                      } else {
                        alert('Failed to import data. Please check the file format.');
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
                className="hidden"
                id="import-file"
              />
              <label
                htmlFor="import-file"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Import Data
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(isCreating || isEditing) && (
        <AnnouncementModal
          announcement={isEditing ? announcements.find(a => a.id === isEditing) : null}
          pastEvent={isEditing ? pastEvents.find(e => e.id === isEditing) : null}
          type={activeTab}
          onSave={activeTab === 'announcements' 
            ? (data) => isEditing ? handleUpdateAnnouncement(isEditing, data) : handleCreateAnnouncement(data)
            : (data) => isEditing ? announcementService.updatePastEvent(isEditing, data) && loadData() && setIsEditing(null) : handleCreatePastEvent(data)
          }
          onClose={() => {
            setIsCreating(false);
            setIsEditing(null);
          }}
        />
      )}
    </div>
  );
};

// Modal Component for Create/Edit
const AnnouncementModal: React.FC<{
  announcement?: Announcement | null;
  pastEvent?: PastEvent | null;
  type: 'announcements' | 'past-events' | 'stats';
  onSave: (data: any) => void;
  onClose: () => void;
}> = ({ announcement, pastEvent, type, onSave, onClose }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        description: announcement.description,
        type: announcement.type,
        status: announcement.status,
        date: announcement.date || '',
        authors: announcement.authors?.join(', ') || '',
        location: announcement.location || '',
        url: announcement.url || '',
        tags: announcement.tags.join(', '),
        priority: announcement.priority,
        isActive: announcement.isActive,
        journal: announcement.metadata?.journal || '',
        format: announcement.metadata?.format || '',
        duration: announcement.metadata?.duration || '',
        registrationRequired: announcement.metadata?.registrationRequired || false,
        capacity: announcement.metadata?.capacity || '',
        cost: announcement.metadata?.cost || '',
        targetAudience: announcement.metadata?.targetAudience?.join(', ') || '',
        resources: announcement.metadata?.resources?.join(', ') || ''
      });
    } else if (pastEvent) {
      setFormData({
        title: pastEvent.title,
        description: pastEvent.description,
        type: pastEvent.type,
        completedDate: pastEvent.completedDate.toISOString().split('T')[0],
        participants: pastEvent.participants || '',
        rating: pastEvent.rating || '',
        recordings: pastEvent.recordings?.join(', ') || '',
        materials: pastEvent.materials?.join(', ') || '',
        testimonials: pastEvent.testimonials?.join('\n') || '',
        summary: pastEvent.summary || '',
        keyTakeaways: pastEvent.keyTakeaways?.join('\n') || '',
        followUpActions: pastEvent.followUpActions?.join('\n') || '',
        tags: pastEvent.tags.join(', '),
        isPubliclyVisible: pastEvent.isPubliclyVisible
      });
    }
  }, [announcement, pastEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-vedic-border">
          <h3 className="text-xl font-semibold text-vedic-accent-dark">
            {announcement || pastEvent ? 'Edit' : 'Create'} {type === 'announcements' ? 'Announcement' : 'Past Event'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'announcements' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Type *</label>
                  <select
                    required
                    value={formData.type || 'seminar'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  >
                    <option value="seminar">Seminar</option>
                    <option value="podcast">Podcast</option>
                    <option value="publication">Publication</option>
                    <option value="event">Event</option>
                    <option value="course">Course</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-vedic-primary-text mb-2">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Status *</label>
                  <select
                    required
                    value={formData.status || 'upcoming'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="published">Published</option>
                    <option value="in-development">In Development</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Priority</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.priority || 1}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive ?? true}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-vedic-primary-text">Active</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Date</label>
                  <input
                    type="text"
                    placeholder="e.g., Coming Soon, Q2 2025, March 15, 2025"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Authors</label>
                  <input
                    type="text"
                    placeholder="Dr. Name, Prof. Name (comma-separated)"
                    value={formData.authors || ''}
                    onChange={(e) => setFormData({...formData, authors: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Location/Journal</label>
                  <input
                    type="text"
                    value={formData.journal || formData.location || ''}
                    onChange={(e) => setFormData({...formData, journal: e.target.value, location: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Format</label>
                  <input
                    type="text"
                    placeholder="e.g., Academic Webinar, Peer-reviewed Article"
                    value={formData.format || ''}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-vedic-primary-text mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="healthcare, research, ai (comma-separated)"
                  value={formData.tags || ''}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                />
              </div>
            </>
          ) : (
            <>
              {/* Past Event Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Type *</label>
                  <select
                    required
                    value={formData.type || 'workshop'}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  >
                    <option value="seminar">Seminar</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="webinar">Webinar</option>
                    <option value="podcast-episode">Podcast Episode</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-vedic-primary-text mb-2">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Completed Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.completedDate || ''}
                    onChange={(e) => setFormData({...formData, completedDate: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Participants</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.participants || ''}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-vedic-primary-text mb-2">Summary</label>
                <textarea
                  rows={3}
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vedic-primary-text mb-2">Key Takeaways (one per line)</label>
                <textarea
                  rows={4}
                  value={formData.keyTakeaways || ''}
                  onChange={(e) => setFormData({...formData, keyTakeaways: e.target.value})}
                  className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vedic-primary-text mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="workshop, ai, meditation (comma-separated)"
                    value={formData.tags || ''}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPubliclyVisible"
                    checked={formData.isPubliclyVisible ?? true}
                    onChange={(e) => setFormData({...formData, isPubliclyVisible: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isPubliclyVisible" className="text-sm font-medium text-vedic-primary-text">Publicly Visible</label>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-vedic-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-vedic-secondary-text border border-vedic-border rounded-lg hover:bg-vedic-bg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
            >
              {announcement || pastEvent ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementManagement;
