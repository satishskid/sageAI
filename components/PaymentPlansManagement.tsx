import React, { useState, useEffect } from 'react';
import ConfigurationService, { PaymentPlan, APIConfiguration } from '../services/configurationService';
import { useToast } from './Toast';

const PaymentPlansManagement: React.FC = () => {
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [apis, setApis] = useState<APIConfiguration[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PaymentPlan | null>(null);
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');
  const { showToast, ToastContainer } = useToast();
  const [newPlan, setNewPlan] = useState<Partial<PaymentPlan>>({
    name: '',
    description: '',
    price: 0,
    currency: 'usd',
    interval: 'month',
    features: [],
    messageLimit: 100,
    apiAccess: [],
    priority: false,
    enabled: true,
    popular: false
  });

  const configService = ConfigurationService.getInstance();

  useEffect(() => {
    loadPlans();
    loadAPIs();
  }, []);

  const loadPlans = () => {
    setPlans(configService.getAllPaymentPlans());
  };

  const loadAPIs = () => {
    setApis(configService.getAPIConfigs());
  };



  const handleUpdatePlan = (id: string, updates: Partial<PaymentPlan>) => {
    try {
      configService.updatePaymentPlan(id, updates);
      const plan = plans.find(p => p.id === id);
      if (updates.enabled !== undefined) {
        showToast(`Plan "${plan?.name}" ${updates.enabled ? 'enabled' : 'disabled'}`, 'success');
      }
      loadPlans();
    } catch (error) {
      showToast('Failed to update payment plan', 'error');
    }
  };

  const handleEditPlan = (plan: PaymentPlan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      currency: plan.currency,
      interval: plan.interval,
      features: [...plan.features],
      messageLimit: plan.messageLimit,
      apiAccess: [...plan.apiAccess],
      priority: plan.priority,
      enabled: plan.enabled,
      popular: plan.popular,
      stripePriceId: plan.stripePriceId
    });
    setShowAddForm(true);
  };

  const handleSavePlan = () => {
    if (newPlan.name && newPlan.description) {
      try {
        if (editingPlan) {
          // Update existing plan
          configService.updatePaymentPlan(editingPlan.id, newPlan);
          showToast(`Payment plan "${newPlan.name}" updated successfully!`, 'success');
          setEditingPlan(null);
        } else {
          // Add new plan
          configService.addPaymentPlan(newPlan as Omit<PaymentPlan, 'id'>);
          showToast(`Payment plan "${newPlan.name}" created successfully!`, 'success');
        }

        setNewPlan({
          name: '',
          description: '',
          price: 0,
          currency: 'usd',
          interval: 'month',
          features: [],
          messageLimit: 100,
          apiAccess: [],
          priority: false,
          enabled: true,
          popular: false
        });
        setShowAddForm(false);
        loadPlans();
      } catch (error) {
        showToast('Failed to save payment plan', 'error');
      }
    } else {
      showToast('Please fill in all required fields (Name, Description)', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
    setShowAddForm(false);
    setNewPlan({
      name: '',
      description: '',
      price: 0,
      currency: 'usd',
      interval: 'month',
      features: [],
      messageLimit: 100,
      apiAccess: [],
      priority: false,
      enabled: true,
      popular: false
    });
  };

  const handleDeletePlan = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the payment plan "${name}"? This action cannot be undone.`)) {
      try {
        configService.deletePaymentPlan(id);
        showToast(`Payment plan "${name}" deleted successfully`, 'success');
        loadPlans();
      } catch (error) {
        showToast('Failed to delete payment plan', 'error');
      }
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const locale = currency.toLowerCase() === 'inr' ? 'en-IN' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100);
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols = {
      usd: '$',
      inr: '₹',
      eur: '€',
      gbp: '£'
    };
    return symbols[currency.toLowerCase() as keyof typeof symbols] || currency.toUpperCase();
  };



  const addFeature = (feature: string) => {
    if (feature.trim()) {
      setNewPlan({
        ...newPlan,
        features: [...(newPlan.features || []), feature.trim()]
      });
    }
  };

  const removeFeature = (index: number) => {
    const features = [...(newPlan.features || [])];
    features.splice(index, 1);
    setNewPlan({ ...newPlan, features });
  };

  const toggleAPIAccess = (apiId: string) => {
    const apiAccess = newPlan.apiAccess || [];
    const newAccess = apiAccess.includes(apiId)
      ? apiAccess.filter(id => id !== apiId)
      : [...apiAccess, apiId];
    setNewPlan({ ...newPlan, apiAccess: newAccess });
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-vedic-accent-dark">Payment Plans Management</h2>
        <div className="flex gap-2">
          <div className="relative group">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Quick Templates ▼
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-vedic-border rounded-lg shadow-lg z-10 hidden group-hover:block min-w-48">
              <button
                onClick={() => {
                  setNewPlan({
                    name: 'Pro Plan (USD)',
                    description: 'Premium features for international users',
                    price: 1999,
                    currency: 'usd',
                    interval: 'month',
                    features: ['Unlimited messages', 'Premium support', 'Priority API access'],
                    messageLimit: -1,
                    apiAccess: apis.map(api => api.id),
                    priority: true,
                    enabled: true,
                    popular: true
                  });
                  setShowAddForm(true);
                }}
                className="w-full text-left px-4 py-2 hover:bg-vedic-bg text-sm"
              >
                🇺🇸 Pro Plan (USD) - $19.99
              </button>
              <button
                onClick={() => {
                  setNewPlan({
                    name: 'Pro Plan (INR)',
                    description: 'Premium features for Indian users',
                    price: 149900,
                    currency: 'inr',
                    interval: 'month',
                    features: ['Unlimited messages', 'Premium support', 'Priority API access', 'India-specific content'],
                    messageLimit: -1,
                    apiAccess: apis.map(api => api.id),
                    priority: true,
                    enabled: true,
                    popular: true
                  });
                  setShowAddForm(true);
                }}
                className="w-full text-left px-4 py-2 hover:bg-vedic-bg text-sm"
              >
                🇮🇳 Pro Plan (INR) - ₹1,499
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
          >
            Add New Plan
          </button>
        </div>
      </div>

      {/* Add/Edit Plan Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-vedic-border rounded-lg bg-vedic-bg-alt">
          <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">
            {editingPlan ? 'Edit Payment Plan' : 'Add New Payment Plan'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Plan Name</label>
              <input
                type="text"
                value={newPlan.name || ''}
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="e.g., Premium Plan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">
                Price ({newPlan.currency === 'inr' ? 'in paise' : 'in cents'})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vedic-secondary-text">
                  {getCurrencySymbol(newPlan.currency || 'usd')}
                </span>
                <input
                  type="number"
                  value={newPlan.price || 0}
                  onChange={(e) => setNewPlan({...newPlan, price: parseInt(e.target.value)})}
                  className="w-full pl-8 pr-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  placeholder={
                    newPlan.currency === 'inr'
                      ? '19900 for ₹199'
                      : '1999 for $19.99'
                  }
                />
              </div>
              <p className="text-xs text-vedic-secondary-text mt-1">
                {newPlan.currency === 'inr'
                  ? 'Enter amount in paise (₹199 = 19900 paise)'
                  : 'Enter amount in cents ($19.99 = 1999 cents)'
                }
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Currency</label>
              <select
                value={newPlan.currency || 'usd'}
                onChange={(e) => setNewPlan({...newPlan, currency: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              >
                <option value="usd">🇺🇸 USD - US Dollar</option>
                <option value="inr">🇮🇳 INR - Indian Rupee</option>
                <option value="eur">🇪🇺 EUR - Euro</option>
                <option value="gbp">🇬🇧 GBP - British Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Billing Interval</label>
              <select
                value={newPlan.interval || 'month'}
                onChange={(e) => setNewPlan({...newPlan, interval: e.target.value as 'month' | 'year'})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Message Limit</label>
              <input
                type="number"
                value={newPlan.messageLimit || 100}
                onChange={(e) => setNewPlan({...newPlan, messageLimit: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="-1 for unlimited"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Stripe Price ID</label>
              <input
                type="text"
                value={newPlan.stripePriceId || ''}
                onChange={(e) => setNewPlan({...newPlan, stripePriceId: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="price_1234567890"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-vedic-primary-text mb-1">Description</label>
            <textarea
              value={newPlan.description || ''}
              onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
              className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              rows={2}
              placeholder="Brief description of this plan"
            />
          </div>

          {/* Features */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-vedic-primary-text mb-2">Features</label>
            <div className="space-y-2">
              {(newPlan.features || []).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 px-3 py-2 bg-white border border-vedic-border rounded-lg">{feature}</span>
                  <button
                    onClick={() => removeFeature(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a feature"
                  className="flex-1 px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addFeature((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                    addFeature(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* API Access */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-vedic-primary-text mb-2">API Access</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {apis.map((api) => (
                <label key={api.id} className="flex items-center gap-2 p-2 border border-vedic-border rounded-lg cursor-pointer hover:bg-vedic-bg">
                  <input
                    type="checkbox"
                    checked={(newPlan.apiAccess || []).includes(api.id)}
                    onChange={() => toggleAPIAccess(api.id)}
                    className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
                  />
                  <span className="text-sm">{api.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newPlan.priority || false}
                onChange={(e) => setNewPlan({...newPlan, priority: e.target.checked})}
                className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
              />
              <span className="text-sm">Priority API Access</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newPlan.popular || false}
                onChange={(e) => setNewPlan({...newPlan, popular: e.target.checked})}
                className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
              />
              <span className="text-sm">Mark as Popular</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newPlan.enabled !== false}
                onChange={(e) => setNewPlan({...newPlan, enabled: e.target.checked})}
                className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
              />
              <span className="text-sm">Enabled</span>
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-vedic-secondary-text hover:text-vedic-primary-text transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePlan}
              className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
            >
              {editingPlan ? 'Update Plan' : 'Add Plan'}
            </button>
          </div>
        </div>
      )}

      {/* Currency Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-vedic-primary-text">Filter by Currency:</label>
        <select
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value)}
          className="px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
        >
          <option value="all">All Currencies</option>
          <option value="usd">🇺🇸 USD Only</option>
          <option value="inr">🇮🇳 INR Only</option>
          <option value="eur">🇪🇺 EUR Only</option>
          <option value="gbp">🇬🇧 GBP Only</option>
        </select>
        <span className="text-sm text-vedic-secondary-text">
          {plans.filter(plan => currencyFilter === 'all' || plan.currency === currencyFilter).length} plans
        </span>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans
          .filter(plan => currencyFilter === 'all' || plan.currency === currencyFilter)
          .map((plan) => (
          <div key={plan.id} className={`border rounded-lg p-6 ${plan.popular ? 'border-vedic-accent bg-vedic-accent/5' : 'border-vedic-border'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-vedic-accent-dark">{plan.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    plan.currency === 'inr'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {plan.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {plan.popular && (
                    <span className="inline-block px-2 py-1 text-xs bg-vedic-accent text-white rounded-full">
                      Popular
                    </span>
                  )}
                  {!plan.enabled && (
                    <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      Disabled
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-vedic-accent">
                  {formatPrice(plan.price, plan.currency)}
                </div>
                <div className="text-sm text-vedic-secondary-text">
                  per {plan.interval}
                  {plan.currency.toUpperCase() === 'INR' && (
                    <span className="block text-xs text-vedic-secondary-text">
                      (~${(plan.price / 100 / 83).toFixed(2)} USD)
                    </span>
                  )}
                  {plan.currency.toUpperCase() === 'USD' && (
                    <span className="block text-xs text-vedic-secondary-text">
                      (~₹{(plan.price / 100 * 83).toFixed(0)} INR)
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-vedic-secondary-text mb-4">{plan.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="font-medium">Messages: </span>
                {plan.messageLimit === -1 ? 'Unlimited' : plan.messageLimit.toLocaleString()}
              </div>
              <div className="text-sm">
                <span className="font-medium">API Access: </span>
                {plan.apiAccess.length} APIs
              </div>
              <div className="text-sm">
                <span className="font-medium">Priority: </span>
                {plan.priority ? 'Yes' : 'No'}
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {plan.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="text-sm text-vedic-secondary-text flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {feature}
                </div>
              ))}
              {plan.features.length > 3 && (
                <div className="text-sm text-vedic-secondary-text">
                  +{plan.features.length - 3} more features
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleUpdatePlan(plan.id, { enabled: !plan.enabled })}
                className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                  plan.enabled 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {plan.enabled ? 'Disable' : 'Enable'}
              </button>
              <button
                onClick={() => handleEditPlan(plan)}
                className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePlan(plan.id, plan.name)}
                className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {plans.filter(plan => currencyFilter === 'all' || plan.currency === currencyFilter).length === 0 && (
        <div className="text-center py-8 text-vedic-secondary-text">
          {plans.length === 0
            ? 'No payment plans configured. Add your first plan to get started.'
            : `No plans found for ${currencyFilter.toUpperCase()} currency. Try a different filter or add a new plan.`
          }
        </div>
      )}
      </div>
    </>
  );
};

export default PaymentPlansManagement;
