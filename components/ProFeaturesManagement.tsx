import React, { useState, useEffect } from 'react';
import ProFeaturesService, { ProFeature, ProModule } from '../services/proFeaturesService';
import { useToast } from './Toast';

const ProFeaturesManagement: React.FC = () => {
  const [features, setFeatures] = useState<ProFeature[]>([]);
  const [modules, setModules] = useState<ProModule[]>([]);
  const [activeTab, setActiveTab] = useState<'features' | 'modules' | 'simulation'>('features');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { showToast, ToastContainer } = useToast();

  const proService = ProFeaturesService.getInstance();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    proService.loadFromStorage();
    setFeatures(proService.getProFeatures());
    setModules(proService.getProModules());
  };

  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    try {
      if (enabled) {
        proService.enableFeature(featureId);
        showToast(`Feature enabled successfully`, 'success');
      } else {
        proService.disableFeature(featureId);
        showToast(`Feature disabled successfully`, 'success');
      }
      loadData();
    } catch (error) {
      showToast('Failed to update feature', 'error');
    }
  };

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    try {
      if (enabled) {
        proService.enableModule(moduleId);
        showToast(`Module and its features enabled successfully`, 'success');
      } else {
        proService.disableModule(moduleId);
        showToast(`Module disabled successfully`, 'success');
      }
      loadData();
    } catch (error) {
      showToast('Failed to update module', 'error');
    }
  };

  const simulatePaymentActivation = (plan: 'pro' | 'enterprise') => {
    try {
      if (plan === 'pro') {
        proService.activateProPlan();
        showToast('🎉 Pro Plan Activated! All Pro features are now enabled.', 'success');
      } else {
        proService.activateEnterprisePlan();
        showToast('🎉 Enterprise Plan Activated! All features are now enabled.', 'success');
      }
      loadData();
    } catch (error) {
      showToast('Failed to activate plan', 'error');
    }
  };

  const simulatePaymentDeactivation = () => {
    try {
      proService.deactivateProFeatures();
      showToast('❌ Subscription cancelled. Reverted to free tier.', 'info');
      loadData();
    } catch (error) {
      showToast('Failed to deactivate features', 'error');
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      content: '📚',
      functionality: '⚙️',
      support: '🎧',
      analytics: '📊',
      customization: '🎨'
    };
    return icons[category as keyof typeof icons] || '🔧';
  };

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: 'bg-gray-100 text-gray-800',
      pro: 'bg-blue-100 text-blue-800',
      enterprise: 'bg-purple-100 text-purple-800'
    };
    return badges[plan as keyof typeof badges] || badges.free;
  };

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-vedic-accent-dark">Pro Features Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const config = proService.exportConfiguration();
                const blob = new Blob([config], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pro-features-config.json';
                a.click();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Export Config
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8 border-b border-vedic-border">
            {[
              { id: 'features', label: 'Features', icon: '🔧' },
              { id: 'modules', label: 'Modules', icon: '📦' },
              { id: 'simulation', label: 'Payment Simulation', icon: '💳' }
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

        {/* Features Tab */}
        {activeTab === 'features' && (
          <>
            {/* Category Filter */}
            <div className="mb-6 flex items-center gap-4">
              <label className="text-sm font-medium text-vedic-primary-text">Filter by Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="content">📚 Content</option>
                <option value="functionality">⚙️ Functionality</option>
                <option value="support">🎧 Support</option>
                <option value="analytics">📊 Analytics</option>
                <option value="customization">🎨 Customization</option>
              </select>
              <span className="text-sm text-vedic-secondary-text">
                {filteredFeatures.length} features
              </span>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {filteredFeatures.map((feature) => (
                <div key={feature.id} className="border border-vedic-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{getCategoryIcon(feature.category)}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-vedic-primary-text">{feature.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPlanBadge(feature.minimumPlan)}`}>
                            {feature.minimumPlan.toUpperCase()}
                          </span>
                          {feature.requiresPayment && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              💳 Paid
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-vedic-secondary-text">{feature.description}</p>
                        {feature.stripeProductId && (
                          <p className="text-xs text-vedic-secondary-text mt-1">
                            Stripe Product: {feature.stripeProductId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={feature.enabled}
                          onChange={(e) => handleFeatureToggle(feature.id, e.target.checked)}
                          className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
                        />
                        <span className="text-sm">
                          {feature.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id} className="border border-vedic-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📦</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-vedic-primary-text">{module.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPlanBadge(module.minimumPlan)}`}>
                          {module.minimumPlan.toUpperCase()}
                        </span>
                        {module.requiresPayment && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            💳 Paid
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-vedic-secondary-text">{module.description}</p>
                      <div className="mt-2">
                        <p className="text-xs text-vedic-secondary-text">
                          <strong>Features:</strong> {module.features.join(', ')}
                        </p>
                        {module.route && (
                          <p className="text-xs text-vedic-secondary-text">
                            <strong>Route:</strong> {module.route}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={module.enabled}
                        onChange={(e) => handleModuleToggle(module.id, e.target.checked)}
                        className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
                      />
                      <span className="text-sm">
                        {module.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Simulation Tab */}
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            <div className="bg-vedic-bg-alt p-6 rounded-lg">
              <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">
                💳 Payment Gateway Integration Simulation
              </h3>
              <p className="text-vedic-secondary-text mb-6">
                Use these buttons to simulate what happens when users complete payments through Stripe/Razorpay.
                In production, these actions will be triggered by webhook events.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pro Plan Activation */}
                <div className="bg-white p-4 rounded-lg border border-vedic-border">
                  <h4 className="font-medium text-vedic-accent-dark mb-2">🚀 Activate Pro Plan</h4>
                  <p className="text-sm text-vedic-secondary-text mb-4">
                    Simulates successful Pro plan payment (₹1,499/month)
                  </p>
                  <button
                    onClick={() => simulatePaymentActivation('pro')}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Simulate Pro Payment
                  </button>
                </div>

                {/* Enterprise Plan Activation */}
                <div className="bg-white p-4 rounded-lg border border-vedic-border">
                  <h4 className="font-medium text-vedic-accent-dark mb-2">🏢 Activate Enterprise</h4>
                  <p className="text-sm text-vedic-secondary-text mb-4">
                    Simulates successful Enterprise payment (₹3,999/month)
                  </p>
                  <button
                    onClick={() => simulatePaymentActivation('enterprise')}
                    className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Simulate Enterprise Payment
                  </button>
                </div>

                {/* Subscription Cancellation */}
                <div className="bg-white p-4 rounded-lg border border-vedic-border">
                  <h4 className="font-medium text-vedic-accent-dark mb-2">❌ Cancel Subscription</h4>
                  <p className="text-sm text-vedic-secondary-text mb-4">
                    Simulates subscription cancellation or payment failure
                  </p>
                  <button
                    onClick={simulatePaymentDeactivation}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Simulate Cancellation
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">🔧 Integration Instructions</h4>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p><strong>For Stripe Integration:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Set up webhook endpoints for <code>checkout.session.completed</code></li>
                    <li>Call <code>proService.activateProPlan()</code> on successful payment</li>
                    <li>Call <code>proService.deactivateProFeatures()</code> on cancellation</li>
                  </ul>
                  <p className="mt-3"><strong>For Razorpay Integration:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Handle <code>payment.captured</code> webhook events</li>
                    <li>Verify payment signature before activating features</li>
                    <li>Store subscription details in user metadata</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-white p-4 rounded-lg border border-vedic-border">
              <h4 className="font-medium text-vedic-accent-dark mb-3">📊 Current Feature Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium">Total Features</div>
                  <div className="text-vedic-accent">{features.length}</div>
                </div>
                <div>
                  <div className="font-medium">Enabled</div>
                  <div className="text-green-600">{features.filter(f => f.enabled).length}</div>
                </div>
                <div>
                  <div className="font-medium">Pro Features</div>
                  <div className="text-blue-600">{features.filter(f => f.minimumPlan === 'pro').length}</div>
                </div>
                <div>
                  <div className="font-medium">Enterprise</div>
                  <div className="text-purple-600">{features.filter(f => f.minimumPlan === 'enterprise').length}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProFeaturesManagement;
