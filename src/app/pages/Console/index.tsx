import * as React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  ServerIcon,
  CommandLineIcon,
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  ShieldCheckIcon,
  DocumentIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  KeyIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Internal Components
const ConsoleOutput = ({ logs }: { logs: string[] }) => (
  <div className="bg-gray-900 text-gray-100 font-mono p-4 rounded-lg h-96 overflow-y-auto">
    {logs.map((log, index) => (
      <div key={index} className="py-1">
        <span className="text-gray-500">[{new Date().toISOString()}]</span> {log}
      </div>
    ))}
  </div>
);

const FileManager = () => {
  const [expandedFolders, setExpandedFolders] = React.useState<string[]>(['/']);
  
  const sampleFileStructure = {
    public_html: {
      type: 'folder',
      children: {
        'css': {
          type: 'folder',
          children: {
            'style.css': { type: 'file', size: '24KB' },
            'main.css': { type: 'file', size: '12KB' }
          }
        },
        'js': {
          type: 'folder',
          children: {
            'app.js': { type: 'file', size: '156KB' },
            'utils.js': { type: 'file', size: '45KB' }
          }
        },
        'index.html': { type: 'file', size: '8KB' }
      }
    },
    logs: {
      type: 'folder',
      children: {
        'error.log': { type: 'file', size: '1.2MB' },
        'access.log': { type: 'file', size: '3.4MB' }
      }
    }
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const renderFileTree = (structure: any, path: string = '', level: number = 0) => {
    return Object.entries(structure).map(([name, details]: [string, any]) => {
      const currentPath = `${path}/${name}`;
      const isExpanded = expandedFolders.includes(currentPath);

      return (
        <div key={currentPath} style={{ marginLeft: `${level * 20}px` }}>
          <div
            className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => details.type === 'folder' && toggleFolder(currentPath)}
          >
            {details.type === 'folder' && (
              <span className="w-4">
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                )}
              </span>
            )}
            {details.type === 'folder' ? (
              <FolderIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <DocumentIcon className="h-5 w-5 text-gray-500" />
            )}
            <span className="text-sm">{name}</span>
            {details.type === 'file' && (
              <span className="text-xs text-gray-500 ml-auto">{details.size}</span>
            )}
          </div>
          {details.type === 'folder' && isExpanded && (
            <div>
              {renderFileTree(details.children, currentPath, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">File Manager</h3>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors">
              Upload File
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              New Folder
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="border rounded-lg">
          {renderFileTree(sampleFileStructure)}
        </div>
      </div>
    </div>
  );
};

const ServerStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {[
      { label: 'CPU Usage', value: '45%' },
      { label: 'Memory', value: '2.4GB / 4GB' },
      { label: 'Disk Space', value: '28GB / 50GB' },
    ].map((stat) => (
      <div key={stat.label} className="bg-white rounded-lg shadow p-4">
        <h4 className="text-sm text-gray-500">{stat.label}</h4>
        <p className="text-xl font-semibold mt-1">{stat.value}</p>
      </div>
    ))}
  </div>
);

const FileZillaCredentials = () => (
  <div className="space-y-6">
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Use these credentials in FileZilla or any other FTP client to manage your files remotely.
          </p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 gap-6">
      {[
        { label: 'Host', value: 'ftp.yourdomain.com', description: 'The FTP server address' },
        { label: 'Port', value: '21', description: 'Default FTP port' },
        { label: 'Username', value: 'user123', description: 'Your FTP username' },
        { label: 'Password', value: '••••••••', description: 'Your FTP password' },
      ].map((field) => (
        <div key={field.label} className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <div className="mt-1 flex">
            <input
              type={field.label === 'Password' ? 'password' : 'text'}
              value={field.value}
              readOnly
              className="flex-1 block w-full rounded-md border-gray-300 bg-gray-50 text-sm"
            />
            <button className="ml-2 px-3 py-1 text-sm text-[#1a365d] hover:bg-gray-50 rounded-md border border-gray-300">
              Copy
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">{field.description}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <h3 className="text-lg font-medium mb-4">How to Connect</h3>
      <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600">
        <li>Download and install <a href="https://filezilla-project.org/" className="text-[#1a365d] hover:underline" target="_blank" rel="noopener noreferrer">FileZilla</a></li>
        <li>Open FileZilla and click on "File {`>`} Site Manager"</li>
        <li>Click "New Site" and enter a name for your connection</li>
        <li>Enter the credentials above in the corresponding fields</li>
        <li>Select "Normal" as the logon type</li>
        <li>Click "Connect" to establish the connection</li>
      </ol>
    </div>
  </div>
);

// Add new component for Settings
const SettingsContent = () => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  return (
    <div className="space-y-8">
      {/* Information Section */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Manage your server settings, configurations, and advanced options here. Some changes may require a server restart.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Server Properties', description: 'Configure server.properties file', icon: DocumentTextIcon },
          { title: 'Plugins Manager', description: 'Install and manage plugins', icon: CogIcon },
          { title: 'Backup Settings', description: 'Configure automatic backups', icon: ShieldCheckIcon },
          { title: 'Access Control', description: 'Manage user permissions', icon: KeyIcon },
        ].map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#1a365d] cursor-pointer transition-colors">
            <div className="flex items-start space-x-4">
              <item.icon className="h-6 w-6 text-[#1a365d]" />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 rounded-lg">
        <div className="px-4 py-3 bg-red-50 rounded-t-lg border-b border-red-200">
          <h3 className="text-red-800 font-medium">Danger Zone</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Reset Server Content</h4>
              <p className="text-sm text-gray-500">Remove all world data and configurations</p>
            </div>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset Content
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Reset</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to reset all server content? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement reset logic here
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add new StatisticsContent component
const StatisticsContent = () => {
  const performanceMetrics = [
    { label: 'Average Response Time', value: '145ms', trend: 'down', change: '12%' },
    { label: 'Requests per Second', value: '256', trend: 'up', change: '8%' },
    { label: 'Active Users', value: '1,234', trend: 'up', change: '23%' },
    { label: 'Error Rate', value: '0.05%', trend: 'down', change: '5%' },
  ];

  const timeframeStats = [
    { period: '24h', visits: '12.5k', bandwidth: '45.8 GB', errors: '23' },
    { period: '7d', visits: '68.2k', bandwidth: '256.4 GB', errors: '156' },
    { period: '30d', visits: '284.7k', bandwidth: '1.2 TB', errors: '643' },
  ];

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Monitor your server's performance metrics and usage statistics over time.
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
              <span className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Timeframe Statistics */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium">Usage Statistics</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-4 text-sm font-medium text-gray-500">
            <div>Period</div>
            <div>Total Visits</div>
            <div>Bandwidth Used</div>
            <div>Error Count</div>
          </div>
          {timeframeStats.map((stat) => (
            <div key={stat.period} className="grid grid-cols-4 gap-4 py-3 border-t border-gray-100">
              <div className="font-medium">{stat.period}</div>
              <div>{stat.visits}</div>
              <div>{stat.bandwidth}</div>
              <div>{stat.errors}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            title: 'Peak Hours',
            value: '2PM - 6PM UTC',
            description: 'Highest server activity',
            icon: ClockIcon 
          },
          { 
            title: 'Most Active Users',
            value: 'United States',
            description: 'By geographic location',
            icon: UserGroupIcon 
          },
          { 
            title: 'Uptime',
            value: '99.98%',
            description: 'Last 30 days',
            icon: ServerIcon 
          },
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <stat.icon className="h-8 w-8 text-[#1a365d]" />
              <div>
                <h3 className="font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add new BackupsContent component
const BackupsContent = () => {
  const [showBackupModal, setShowBackupModal] = React.useState(false);
  
  const backups = [
    { 
      id: '1',
      name: 'Daily Backup',
      created_at: '2024-03-20T10:00:00Z',
      size: '2.4GB',
      type: 'Automated',
      status: 'completed'
    },
    { 
      id: '2',
      name: 'Pre-Update Backup',
      created_at: '2024-03-19T15:30:00Z',
      size: '2.3GB',
      type: 'Manual',
      status: 'completed'
    },
    { 
      id: '3',
      name: 'Weekly Backup',
      created_at: '2024-03-18T00:00:00Z',
      size: '2.3GB',
      type: 'Automated',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Regular backups help protect your data. Automated backups are performed daily, but you can also create manual backups at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Backup Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            title: 'Last Backup',
            value: '2 hours ago',
            description: 'Automated daily backup'
          },
          { 
            title: 'Total Backups',
            value: '24',
            description: 'Using 48GB storage'
          },
          { 
            title: 'Next Backup',
            value: '22:00 UTC',
            description: 'Scheduled daily backup'
          }
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Backup List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Backup History</h3>
            <button
              onClick={() => setShowBackupModal(true)}
              className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors"
            >
              Create Backup
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{backup.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(backup.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{backup.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{backup.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {backup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#1a365d] hover:text-[#2d4ed8] mr-4">Download</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Backup</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Backup Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                  placeholder="Enter backup name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                  rows={3}
                  placeholder="Enter backup description..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement backup creation logic here
                  setShowBackupModal(false);
                }}
                className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8]"
              >
                Create Backup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Console = () => {
  const { server_id } = useParams<{ server_id: string }>();
  const [activeTab, setActiveTab] = React.useState('console');
  const [serverStatus, setServerStatus] = React.useState('running');
  const [logs, setLogs] = React.useState<string[]>([
    'Server started successfully',
    'Loading world...',
    'World loaded successfully',
  ]);

  const tabs = [
    { id: 'console', name: 'Console', icon: CommandLineIcon },
    { id: 'files', name: 'Files', icon: FolderIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
    { id: 'stats', name: 'Statistics', icon: ChartBarIcon },
    { id: 'backups', name: 'Backups', icon: ShieldCheckIcon },
    { id: 'ftp', name: 'FTP Access', icon: KeyIcon },
  ];

  const handleCommand = (command: string) => {
    setLogs(prev => [...prev, `> ${command}`]);
    // Implement command handling logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Server Status Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ServerIcon className="h-6 w-6 text-gray-400" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Server Console</h1>
                <p className="text-sm text-gray-500">ID: {server_id}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                serverStatus === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {serverStatus.charAt(0).toUpperCase() + serverStatus.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setServerStatus(prev => prev === 'running' ? 'stopped' : 'running')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  serverStatus === 'running'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {serverStatus === 'running' ? 'Stop Server' : 'Start Server'}
              </button>
              <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors">
                Restart
              </button>
            </div>
          </div>
        </div>

        {/* Server Stats */}
        <ServerStats />

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-[#1a365d] text-[#1a365d]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'console' && (
              <div className="space-y-4">
                <ConsoleOutput logs={logs} />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter command..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCommand(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors">
                    Send
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'files' && <FileManager />}
            {activeTab === 'settings' && <SettingsContent />}
            {activeTab === 'stats' && <StatisticsContent />}
            {activeTab === 'backups' && <BackupsContent />}
            {activeTab === 'ftp' && <FileZillaCredentials />}
            {/* Add other tab contents as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}; 