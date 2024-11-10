import React from 'react';

interface IntegrationConfig {
  enabled: boolean;
  apiKey?: string;
  settings?: Record<string, any>;
}

interface IntegrationsPanelProps {
  integrations?: Record<string, IntegrationConfig>;
}

export const IntegrationsPanel: React.FC<IntegrationsPanelProps> = ({
  integrations = {},
}) => {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <section className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Connected Services
            </h3>
            <button className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors">
              Add Integration
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {Object.keys(integrations).length === 0 ? (
              <div className="p-5 text-center text-gray-500">
                No integrations configured yet
              </div>
            ) : (
              Object.entries(integrations).map(([service, config]) => (
                <div
                  key={service}
                  className="p-5 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">#{service}</span>
                        <h4 className="text-lg font-medium text-gray-900 capitalize">
                          {service.replace(/([A-Z])/g, ' $1')}
                        </h4>
                      </div>
                      {config?.enabled && (
                        <span className="text-sm text-gray-500 mt-1">
                          Connected and ready
                        </span>
                      )}
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        config?.enabled
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-[#1a365d] text-white hover:bg-[#2d4a7c]'
                      }`}
                    >
                      {config?.enabled ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  {config?.enabled && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                      <p className="flex items-center">
                        <span className="mr-2">API Key:</span>
                        <code className="font-mono bg-white px-2 py-1 rounded border border-gray-200">
                          {config?.apiKey
                            ? '••••' + config.apiKey.slice(-4)
                            : 'Not set'}
                        </code>
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
