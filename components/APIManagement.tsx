import React, { useState, useEffect } from 'react';
import ConfigurationService, { APIConfiguration } from '../services/configurationService';
import { useToast } from './Toast';

const APIManagement: React.FC = () => {
  const [apis, setApis] = useState<APIConfiguration[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingApi, setEditingApi] = useState<APIConfiguration | null>(null);
  const { showToast, ToastContainer } = useToast();
  const [newApi, setNewApi] = useState<Partial<APIConfiguration>>({
    name: '',
    provider: 'custom',
    apiKey: '',
    model: '',
    enabled: true,
    priority: 1,
    maxTokens: 2048,
    temperature: 0.7,
    description: ''
  });

  const configService = ConfigurationService.getInstance();

  useEffect(() => {
    loadAPIs();
  }, []);

  const loadAPIs = () => {
    setApis(configService.getAPIConfigs());
  };

  const handleEditAPI = (api: APIConfiguration) => {
    setEditingApi(api);
    setNewApi({
      name: api.name,
      provider: api.provider,
      apiKey: api.apiKey,
      model: api.model,
      baseURL: api.baseURL,
      enabled: api.enabled,
      priority: api.priority,
      maxTokens: api.maxTokens,
      temperature: api.temperature,
      description: api.description,
      costPerToken: api.costPerToken,
      rateLimit: api.rateLimit
    });
    setShowAddForm(true);
  };

  const handleSaveAPI = () => {
    if (newApi.name && newApi.apiKey && newApi.model) {
      try {
        if (editingApi) {
          // Update existing API
          configService.updateAPIConfig(editingApi.id, newApi);
          showToast(`API "${newApi.name}" updated successfully!`, 'success');
          setEditingApi(null);
        } else {
          // Add new API
          configService.addAPIConfig(newApi as Omit<APIConfiguration, 'id'>);
          showToast(`API "${newApi.name}" added successfully!`, 'success');
        }

        setNewApi({
          name: '',
          provider: 'custom',
          apiKey: '',
          model: '',
          enabled: true,
          priority: 1,
          maxTokens: 2048,
          temperature: 0.7,
          description: ''
        });
        setShowAddForm(false);
        loadAPIs();
      } catch (error) {
        showToast('Failed to save API configuration', 'error');
      }
    } else {
      showToast('Please fill in all required fields (Name, API Key, Model)', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingApi(null);
    setShowAddForm(false);
    setNewApi({
      name: '',
      provider: 'custom',
      apiKey: '',
      model: '',
      enabled: true,
      priority: 1,
      maxTokens: 2048,
      temperature: 0.7,
      description: ''
    });
  };

  const handleUpdateAPI = (id: string, updates: Partial<APIConfiguration>) => {
    try {
      configService.updateAPIConfig(id, updates);
      const api = apis.find(a => a.id === id);
      if (updates.enabled !== undefined) {
        showToast(`API "${api?.name}" ${updates.enabled ? 'enabled' : 'disabled'}`, 'success');
      }
      loadAPIs();
    } catch (error) {
      showToast('Failed to update API', 'error');
    }
  };

  const handleDeleteAPI = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the API configuration for "${name}"? This action cannot be undone.`)) {
      try {
        configService.deleteAPIConfig(id);
        showToast(`API "${name}" deleted successfully`, 'success');
        loadAPIs();
      } catch (error) {
        showToast('Failed to delete API', 'error');
      }
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      try {
        configService.reorderAPIConfigs(index, index - 1);
        showToast('API priority updated', 'success');
        loadAPIs();
      } catch (error) {
        showToast('Failed to reorder APIs', 'error');
      }
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < apis.length - 1) {
      try {
        configService.reorderAPIConfigs(index, index + 1);
        showToast('API priority updated', 'success');
        loadAPIs();
      } catch (error) {
        showToast('Failed to reorder APIs', 'error');
      }
    }
  };

  const getProviderColor = (provider: string) => {
    const colors = {
      gemini: 'bg-blue-100 text-blue-800',
      groq: 'bg-green-100 text-green-800',
      openrouter: 'bg-purple-100 text-purple-800',
      huggingface: 'bg-yellow-100 text-yellow-800',
      cohere: 'bg-pink-100 text-pink-800',
      together: 'bg-indigo-100 text-indigo-800',
      custom: 'bg-gray-100 text-gray-800'
    };
    return colors[provider as keyof typeof colors] || colors.custom;
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-vedic-accent-dark">API Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
        >
          Add New API
        </button>
      </div>

      {/* Add/Edit API Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border border-vedic-border rounded-lg bg-vedic-bg-alt">
          <h3 className="text-lg font-medium text-vedic-accent-dark mb-4">
            {editingApi ? 'Edit API Configuration' : 'Add New API'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Name</label>
              <input
                type="text"
                value={newApi.name || ''}
                onChange={(e) => setNewApi({...newApi, name: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="e.g., Claude 3.5 Sonnet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Provider</label>
              <select
                value={newApi.provider || 'custom'}
                onChange={(e) => setNewApi({...newApi, provider: e.target.value as any})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              >
                <option value="gemini">Gemini</option>
                <option value="groq">Groq</option>
                <option value="openrouter">OpenRouter</option>
                <option value="huggingface">Hugging Face</option>
                <option value="cohere">Cohere</option>
                <option value="together">Together AI</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">API Key</label>
              <input
                type="password"
                value={newApi.apiKey || ''}
                onChange={(e) => setNewApi({...newApi, apiKey: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="Enter API key"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Model</label>
              <input
                type="text"
                value={newApi.model || ''}
                onChange={(e) => setNewApi({...newApi, model: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="e.g., gpt-4, claude-3-sonnet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Base URL (optional)</label>
              <input
                type="url"
                value={newApi.baseURL || ''}
                onChange={(e) => setNewApi({...newApi, baseURL: e.target.value})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="https://api.example.com/v1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Max Tokens</label>
              <input
                type="number"
                value={newApi.maxTokens || 2048}
                onChange={(e) => setNewApi({...newApi, maxTokens: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Temperature</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={newApi.temperature || 0.7}
                onChange={(e) => setNewApi({...newApi, temperature: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Cost per Token (optional)</label>
              <input
                type="number"
                step="0.000001"
                value={newApi.costPerToken || ''}
                onChange={(e) => setNewApi({...newApi, costPerToken: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="0.00015"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vedic-primary-text mb-1">Rate Limit (requests/min)</label>
              <input
                type="number"
                value={newApi.rateLimit || ''}
                onChange={(e) => setNewApi({...newApi, rateLimit: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
                placeholder="60"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-vedic-primary-text mb-1">Description</label>
            <textarea
              value={newApi.description || ''}
              onChange={(e) => setNewApi({...newApi, description: e.target.value})}
              className="w-full px-3 py-2 border border-vedic-border rounded-lg focus:ring-2 focus:ring-vedic-accent focus:border-transparent"
              rows={2}
              placeholder="Brief description of this API"
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newApi.enabled !== false}
                onChange={(e) => setNewApi({...newApi, enabled: e.target.checked})}
                className="rounded border-vedic-border text-vedic-accent focus:ring-vedic-accent"
              />
              <span className="text-sm font-medium text-vedic-primary-text">Enable this API</span>
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-vedic-secondary-text hover:text-vedic-primary-text transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAPI}
              className="px-4 py-2 bg-vedic-accent text-white rounded-lg hover:bg-vedic-accent-dark transition-colors"
            >
              {editingApi ? 'Update API' : 'Add API'}
            </button>
          </div>
        </div>
      )}

      {/* API List */}
      <div className="space-y-4">
        {apis.map((api, index) => (
          <div key={api.id} className="border border-vedic-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 text-vedic-secondary-text hover:text-vedic-accent disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === apis.length - 1}
                    className="p-1 text-vedic-secondary-text hover:text-vedic-accent disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-vedic-secondary-text">#{api.priority}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-vedic-primary-text">{api.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getProviderColor(api.provider)}`}>
                        {api.provider}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${api.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {api.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-sm text-vedic-secondary-text">{api.description}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs text-vedic-secondary-text">Model: {api.model}</span>
                      {api.costPerToken && (
                        <span className="text-xs text-vedic-secondary-text">• Cost: ${api.costPerToken.toFixed(6)}/token</span>
                      )}
                      {api.rateLimit && (
                        <span className="text-xs text-vedic-secondary-text">• Rate: {api.rateLimit}/min</span>
                      )}
                      <span className="text-xs text-vedic-secondary-text">• Tokens: {api.maxTokens}</span>
                      <span className="text-xs text-vedic-secondary-text">• Temp: {api.temperature}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateAPI(api.id, { enabled: !api.enabled })}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    api.enabled 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {api.enabled ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => handleEditAPI(api)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAPI(api.id, api.name)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {apis.length === 0 && (
        <div className="text-center py-8 text-vedic-secondary-text">
          No APIs configured. Add your first API to get started.
        </div>
      )}
      </div>
    </>
  );
};

export default APIManagement;
