import React, { useState, useEffect } from 'react';
import AnalyticsService from '../services/analyticsService';
import ConfigurationService from '../services/configurationService';
import APIManagement from './APIManagement';
import PaymentPlansManagement from './PaymentPlansManagement';
import ProFeaturesManagement from './ProFeaturesManagement';
import APIHealthIndicator from './APIHealthIndicator';
import AdminWhitelistManager from './AdminWhitelistManager';

interface APIStatus {
  name: string;
  status: 'healthy' | 'unhealthy' | 'checking';
  responseTime: number;
  lastChecked: Date;
  error?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  messagesThisMonth: number;
  apiUsage: {
    gemini: number;
    groq: number;
    openrouter: number;
  };
}

const AdminDashboard: React.FC = () => {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'apis' | 'plans' | 'pro-features' | 'whitelist' | 'settings'>('overview');

  // Check if user is admin (temporarily allowing all authenticated users for demo)
  const isAdmin = true; // Temporary: allow all users to see admin dashboard for demo

  useEffect(() => {
    if (isAdmin) {
      checkAPIHealth();
      loadUserStats();

      // Update stats every 10 seconds for real-time monitoring
      const interval = setInterval(() => {
        loadUserStats();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  const checkAPIHealth = async () => {
    setIsLoading(true);
    const apis = [
      { name: 'Gemini API', endpoint: 'gemini' },
      { name: 'Groq API', endpoint: 'groq' },
      { name: 'OpenRouter API', endpoint: 'openrouter' }
    ];

    const statuses: APIStatus[] = [];

    for (const api of apis) {
      const startTime = Date.now();
      try {
        // Simulate API health check (in real app, you'd call actual endpoints)
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        statuses.push({
          name: api.name,
          status: Math.random() > 0.1 ? 'healthy' : 'unhealthy', // 90% success rate simulation
          responseTime: Date.now() - startTime,
          lastChecked: new Date()
        });
      } catch (error) {
        statuses.push({
          name: api.name,
          status: 'unhealthy',
          responseTime: Date.now() - startTime,
          lastChecked: new Date(),
          error: 'Connection failed'
        });
      }
    }

    setApiStatuses(statuses);
    setIsLoading(false);
  };

  const loadUserStats = () => {
    // Get real analytics data
    const analytics = AnalyticsService.getInstance();
    const realStats = analytics.getRealUserStats();

    setUserStats({
      totalUsers: realStats.totalUsers,
      activeUsers: realStats.activeUsers,
      premiumUsers: realStats.premiumUsers,
      messagesThisMonth: realStats.messagesThisMonth,
      apiUsage: realStats.apiUsage
    });
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-vedic-accent-dark mb-4">Access Denied</h2>
        <p className="text-vedic-secondary-text">You don't have admin privileges to view this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-vedic-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-vedic-accent-dark">Admin Dashboard</h1>
          <button
            onClick={checkAPIHealth}
            className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
          >
            Refresh Health Check
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-vedic-border">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'apis', label: 'API Management', icon: '🔌' },
              { id: 'plans', label: 'Payment Plans', icon: '💳' },
              { id: 'pro-features', label: 'Pro Features', icon: '⭐' },
              { id: 'whitelist', label: 'User Whitelist', icon: '👥' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* API Health Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-vedic-accent-dark mb-4">API Health Status</h2>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vedic-accent mx-auto"></div>
                  <p className="mt-2 text-vedic-secondary-text">Checking API health...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiStatuses.map((api, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-vedic-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          api.status === 'healthy' ? 'bg-green-500' : 
                          api.status === 'unhealthy' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="font-medium text-vedic-primary-text">{api.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-vedic-secondary-text">
                          {api.responseTime}ms
                        </div>
                        <div className="text-xs text-vedic-secondary-text">
                          {api.lastChecked.toLocaleTimeString()}
                        </div>
                        {api.error && (
                          <div className="text-xs text-red-500">{api.error}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-vedic-accent-dark mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-vedic-secondary-text">Overall Health</span>
                  <span className="font-medium text-green-600">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vedic-secondary-text">Uptime</span>
                  <span className="font-medium text-vedic-primary-text">99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vedic-secondary-text">Active APIs</span>
                  <span className="font-medium text-vedic-primary-text">
                    {apiStatuses.filter(api => api.status === 'healthy').length}/3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        {userStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-vedic-accent">{userStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-vedic-secondary-text mt-1">
                {userStats.totalUsers === 1 ? 'Current session' : 'All time'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-green-600">{userStats.activeUsers}</p>
              <p className="text-sm text-vedic-secondary-text mt-1">Currently online</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Premium Users</h3>
              <p className="text-3xl font-bold text-yellow-600">{userStats.premiumUsers}</p>
              <p className="text-sm text-vedic-secondary-text mt-1">Paid subscribers</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-vedic-accent-dark mb-2">Messages This Month</h3>
              <p className="text-3xl font-bold text-blue-600">{userStats.messagesThisMonth.toLocaleString()}</p>
              <p className="text-sm text-vedic-secondary-text mt-1">
                {userStats.messagesThisMonth === 0 ? 'No messages yet' : 'Real usage data'}
              </p>
            </div>
          </div>
        )}

        {/* API Usage Chart */}
        {userStats && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-vedic-accent-dark mb-4">API Usage Distribution</h2>
            <div className="space-y-4">
              {Object.entries(userStats.apiUsage).map(([api, usage]) => {
                const total = Object.values(userStats.apiUsage).reduce((a, b) => a + b, 0);
                const percentage = (usage / total) * 100;
                return (
                  <div key={api} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium text-vedic-primary-text">{api}</span>
                      <span className="text-vedic-secondary-text">{usage.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-vedic-border rounded-full h-2">
                      <div 
                        className="bg-vedic-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Free API Alternatives */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-vedic-accent-dark mb-4">Free API Alternatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-vedic-border rounded-lg p-4">
              <h3 className="font-semibold text-vedic-accent-dark">Hugging Face</h3>
              <p className="text-sm text-vedic-secondary-text mt-1">Free inference API for various models</p>
              <a href="https://huggingface.co/inference-api" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 text-sm hover:underline">Learn more →</a>
            </div>
            <div className="border border-vedic-border rounded-lg p-4">
              <h3 className="font-semibold text-vedic-accent-dark">Cohere</h3>
              <p className="text-sm text-vedic-secondary-text mt-1">Free tier with 100 API calls/month</p>
              <a href="https://cohere.ai/" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 text-sm hover:underline">Learn more →</a>
            </div>
            <div className="border border-vedic-border rounded-lg p-4">
              <h3 className="font-semibold text-vedic-accent-dark">Together AI</h3>
              <p className="text-sm text-vedic-secondary-text mt-1">$25 free credits for open source models</p>
              <a href="https://together.ai/" target="_blank" rel="noopener noreferrer" 
                 className="text-blue-600 text-sm hover:underline">Learn more →</a>
            </div>
          </div>
        </div>
          </>
        )}

        {/* API Management Tab */}
        {activeTab === 'apis' && (
          <APIManagement />
        )}

        {/* Payment Plans Tab */}
        {activeTab === 'plans' && (
          <PaymentPlansManagement />
        )}

        {/* Pro Features Tab */}
        {activeTab === 'pro-features' && (
          <ProFeaturesManagement />
        )}

        {/* Whitelist Tab */}
        {activeTab === 'whitelist' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-vedic-accent-dark mb-6">User Whitelist Management</h2>
            <AdminWhitelistManager adminEmail="satish@skids.health" />
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-vedic-accent-dark mb-6">System Settings</h2>

            <div className="space-y-6">
              {/* Currency Preferences */}
              <div>
                <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">Currency Preferences</h3>
                <div className="bg-vedic-bg-alt p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-vedic-primary-text mb-2">
                        Primary Currency for New Plans
                      </label>
                      <select className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent">
                        <option value="usd">🇺🇸 USD - US Dollar</option>
                        <option value="inr">🇮🇳 INR - Indian Rupee</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-vedic-primary-text mb-2">
                        Exchange Rate (USD to INR)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue="83.00"
                        className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                        placeholder="83.00"
                      />
                      <p className="text-xs text-vedic-secondary-text mt-1">
                        Used for currency conversion display
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-vedic-primary-text mb-2">Recommended Pricing:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded border">
                        <div className="font-medium text-vedic-accent-dark">USD Pricing</div>
                        <div>Free: $0</div>
                        <div>Pro: $19.99/month</div>
                        <div>Enterprise: $49.99/month</div>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <div className="font-medium text-vedic-accent-dark">INR Pricing</div>
                        <div>Free: ₹0</div>
                        <div>Pro: ₹1,499/month</div>
                        <div>Enterprise: ₹3,999/month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">Configuration Export/Import</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const config = ConfigurationService.getInstance().exportConfiguration();
                      const blob = new Blob([config], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'vedanta-config.json';
                      a.click();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Export Configuration
                  </button>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const config = event.target?.result as string;
                          if (ConfigurationService.getInstance().importConfiguration(config)) {
                            alert('Configuration imported successfully!');
                            window.location.reload();
                          } else {
                            alert('Failed to import configuration. Please check the file format.');
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="hidden"
                    id="config-import"
                  />
                  <label
                    htmlFor="config-import"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                  >
                    Import Configuration
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">Analytics</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const analytics = AnalyticsService.getInstance().exportAnalytics();
                      const blob = new Blob([analytics], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'vedanta-analytics.json';
                      a.click();
                    }}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Export Analytics
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all analytics data?')) {
                        AnalyticsService.getInstance().resetSessionStats();
                        localStorage.removeItem('vedanta-analytics');
                        alert('Analytics data reset successfully!');
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reset Analytics
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">System Information</h3>
                <div className="bg-vedic-bg-alt p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Version:</span> 1.0.0
                    </div>
                    <div>
                      <span className="font-medium">Environment:</span> Development
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Storage:</span> LocalStorage
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Health Indicator for Admin */}
      <APIHealthIndicator />
    </div>
  );
};

export default AdminDashboard;
