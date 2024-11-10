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
  ArrowPathIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { consoleService } from '../../../services/console.service';
import { FileListItem } from './components/FileListItem';

// Add near the top of the file with other imports
const API_URL = 'http://localhost:4000/api/v1';

// Add near the top of the file with other constants
const LOGS_PER_PAGE = 50;

const tabs = [
  { id: 'console', name: 'Console', icon: CommandLineIcon },
  { id: 'files', name: 'Files', icon: FolderIcon },
  { id: 'settings', name: 'Settings', icon: CogIcon },
  { id: 'stats', name: 'Statistics', icon: ChartBarIcon },
  { id: 'backups', name: 'Backups', icon: ShieldCheckIcon },
  { id: 'ftp', name: 'FTP Access', icon: KeyIcon },
];

// Internal Components

const FileManager = () => {
  const { blog_id } = useParams<{ blog_id: string }>();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [serverId, setServerId] = useState<string | null>(null);

  interface FileItem {
    name: string;
    size: number;
    isDirectory: boolean;
    modified: string;
    path: string;
  }

  useEffect(() => {
    const fetchServerId = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/${blog_id}/server`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch server details');
        }

        const data = await response.json();
        setServerId(data.data.server_id);
      } catch (error) {
        console.error('Error fetching server ID:', error);
        toast.error('Failed to connect to server. Please try again later.');
      }
    };

    if (blog_id) {
      fetchServerId();
    }
  }, [blog_id]);

  const fetchFiles = async (path: string = '/') => {
    if (!serverId) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/instances/${serverId}/files?path=${encodeURIComponent(
          path,
        )}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data.data.files);
      setCurrentPath(path);
    } catch (error) {
      toast.error('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  const fetchFileContent = async (path: string) => {
    if (!serverId) return;

    try {
      const response = await fetch(
        `${API_URL}/instances/${serverId}/files/content?path=${encodeURIComponent(
          path,
        )}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }

      const data = await response.json();
      setFileContent(data.data.content);
      setIsEditing(true);
    } catch (error) {
      toast.error('Failed to fetch file content');
    }
  };

  const saveFileContent = async () => {
    if (!serverId || !selectedFile) return;

    try {
      const response = await fetch(
        `${API_URL}/instances/${serverId}/files/content`,
        {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: selectedFile.path,
            content: fileContent,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to save file');
      }

      toast.success('File saved successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save file');
    }
  };

  useEffect(() => {
    if (serverId) {
      fetchFiles();
    }
  }, [serverId]);

  const [expandedFolders, setExpandedFolders] = React.useState<string[]>(['/']);

  const sampleFileStructure = {
    public_html: {
      type: 'folder',
      children: {
        css: {
          type: 'folder',
          children: {
            'style.css': { type: 'file', size: '24KB' },
            'main.css': { type: 'file', size: '12KB' },
          },
        },
        js: {
          type: 'folder',
          children: {
            'app.js': { type: 'file', size: '156KB' },
            'utils.js': { type: 'file', size: '45KB' },
          },
        },
        'index.html': { type: 'file', size: '8KB' },
      },
    },
    logs: {
      type: 'folder',
      children: {
        'error.log': { type: 'file', size: '1.2MB' },
        'access.log': { type: 'file', size: '3.4MB' },
      },
    },
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path],
    );
  };

  const renderFileTree = (
    structure: any,
    path: string = '',
    level: number = 0,
  ) => {
    return Object.entries(structure).map(([name, details]: [string, any]) => {
      const currentPath = `${path}/${name}`;
      const isExpanded = expandedFolders.includes(currentPath);

      return (
        <div key={currentPath} style={{ marginLeft: `${level * 20}px` }}>
          <div
            className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 cursor-pointer"
            onClick={() =>
              details.type === 'folder' && toggleFolder(currentPath)
            }
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
              <span className="text-xs text-gray-500 ml-auto">
                {details.size}
              </span>
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
    <div className="grid grid-cols-1 gap-4">
      {/* File Browser */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Files</h3>
            <div className="space-x-2">
              <button
                onClick={() => fetchFiles(currentPath)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Current path: {currentPath}
          </div>
        </div>

        {/* Change to a table layout for better organization */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Modified
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    <div className="flex justify-center">
                      <LoadingSpinner />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {currentPath !== '/' && (
                    <tr
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        const parentPath =
                          currentPath.split('/').slice(0, -1).join('/') || '/';
                        fetchFiles(parentPath);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ChevronUpIcon className="h-4 w-4 mr-2" />
                          <span>..</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">-</td>
                      <td className="px-6 py-4 whitespace-nowrap">-</td>
                      <td className="px-6 py-4 whitespace-nowrap">-</td>
                    </tr>
                  )}
                  {files.map(file => (
                    <tr
                      key={file.path}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        if (file.isDirectory) {
                          fetchFiles(file.path);
                        } else {
                          setSelectedFile(file);
                          fetchFileContent(file.path);
                        }
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {file.isDirectory ? (
                            <FolderIcon className="h-5 w-5 text-yellow-500 mr-2" />
                          ) : (
                            <DocumentIcon className="h-5 w-5 text-gray-500 mr-2" />
                          )}
                          <span>{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.isDirectory ? '-' : formatFileSize(file.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(file.modified).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {!file.isDirectory && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              // Add download logic here
                            }}
                            className="text-[#1a365d] hover:text-[#2d4ed8]"
                          >
                            Download
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* File Editor Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium">{selectedFile.name}</h3>
              <div className="flex items-center space-x-2">
                {isEditing && (
                  <button
                    onClick={saveFileContent}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => setSelectedFile(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <textarea
                value={fileContent}
                onChange={e => setFileContent(e.target.value)}
                className="w-full h-full font-mono text-sm p-4 border rounded-lg"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add this helper function near the FileManager component
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ServerStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    {[
      { label: 'CPU Usage', value: '45%' },
      { label: 'Memory', value: '2.4GB / 4GB' },
      { label: 'Disk Space', value: '28GB / 50GB' },
    ].map(stat => (
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
            Use these credentials in FileZilla or any other FTP client to manage
            your files remotely.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {[
        {
          label: 'Host',
          value: 'ftp.yourdomain.com',
          description: 'The FTP server address',
        },
        { label: 'Port', value: '21', description: 'Default FTP port' },
        {
          label: 'Username',
          value: 'user123',
          description: 'Your FTP username',
        },
        {
          label: 'Password',
          value: '••••••••',
          description: 'Your FTP password',
        },
      ].map(field => (
        <div
          key={field.label}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
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
        <li>
          Download and install{' '}
          <a
            href="https://filezilla-project.org/"
            className="text-[#1a365d] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            FileZilla
          </a>
        </li>
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
              Manage your server settings, configurations, and advanced options
              here. Some changes may require a server restart.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Server Properties',
            description: 'Configure server.properties file',
            icon: DocumentTextIcon,
          },
          {
            title: 'Plugins Manager',
            description: 'Install and manage plugins',
            icon: CogIcon,
          },
          {
            title: 'Backup Settings',
            description: 'Configure automatic backups',
            icon: ShieldCheckIcon,
          },
          {
            title: 'Access Control',
            description: 'Manage user permissions',
            icon: KeyIcon,
          },
        ].map(item => (
          <div
            key={item.title}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#1a365d] cursor-pointer transition-colors"
          >
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
              <p className="text-sm text-gray-500">
                Remove all world data and configurations
              </p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Reset
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to reset all server content? This action
              cannot be undone.
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
const StatisticsContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">CPU Usage</h3>
        <div className="flex items-center">
          <ArrowUpIcon className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-2xl font-bold">45%</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Memory Usage</h3>
        <div className="flex items-center">
          <ArrowDownIcon className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-2xl font-bold">2.1 GB</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Network I/O</h3>
        <div className="flex items-center">
          <ArrowUpIcon className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-2xl font-bold">150 MB/s</span>
        </div>
      </div>
    </div>
  </div>
);

// Add new BackupsContent component
const BackupsContent = () => {
  const { server_id } = useParams<{ server_id: string }>();
  const [backups, setBackups] = useState<Backup[]>([]);

  useEffect(() => {
    // Fetch backups data
    const fetchBackups = async () => {
      try {
        const response = await axios.get(`/api/instances/${server_id}/backups`);
        setBackups(response.data.data.backups);
      } catch (error) {
        console.error('Failed to fetch backups:', error);
      }
    };
    fetchBackups();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Backups</h2>
        <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors">
          Create Backup
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {backups.map(backup => (
              <tr key={backup.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {backup.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(backup.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {backup.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      backup.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {backup.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-[#1a365d] hover:text-[#2d4ed8]">
                    Restore
                  </button>
                  {' | '}
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add this interface before the BackupsContent component
interface Backup {
  id: string;
  name: string;
  created_at: string;
  size: string;
  type: string;
  status: string;
}

// Add this interface for better type safety
interface ConsoleOutputProps {
  logs: string[];
}

// Update ConsoleOutput component to scroll to bottom automatically and handle scroll up for more logs
const ConsoleOutput = ({ logs }: ConsoleOutputProps) => {
  const consoleRef = React.useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  React.useEffect(() => {
    if (consoleRef.current && autoScroll) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    // Check if we're near the bottom (within 100px)
    const isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 100;
    setAutoScroll(isNearBottom);

    // Handle scroll to top for loading more logs
    if (element.scrollTop === 0) {
      // Load more logs when scrolling to top
      const element = e.currentTarget;
      if (element.scrollTop === 0) {
        // Implement your log loading logic here
        console.log('Loading more logs...');
      }
    }
  };

  return (
    <div
      ref={consoleRef}
      onScroll={handleScroll}
      className="bg-gray-900 text-gray-100 font-mono p-4 rounded-lg h-96 overflow-y-auto"
      style={{ scrollBehavior: 'smooth' }}
    >
      {logs.map((log, index) => (
        <div key={index} className="py-1">
          <span className="text-gray-500">[{new Date().toISOString()}]</span>{' '}
          {log}
        </div>
      ))}
    </div>
  );
};

// Add new service functions
const handleErrorResponse = async (response: Response) => {
  const errorData = await response.json();
  switch (errorData.code) {
    case 400:
      toast.error(
        errorData.message || 'Invalid request. Please check your input.',
      );
      return;
    case 401:
      toast.error('You are not authorized to perform this action');
      return;
    case 403:
      toast.error('You do not have permission to perform this action');
      return;
    case 404:
      toast.error('Instance not found');
      return;
    default:
      toast.error(errorData.message || 'An unexpected error occurred');
      return;
  }
};

// Replace axios calls with fetch
const fetchServerData = async (serverId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
  };

  try {
    const [statusRes, logsRes, statsRes] = await Promise.all([
      fetch(`${API_URL}/instances/${serverId}/status`, requestOptions),
      fetch(`${API_URL}/instances/${serverId}/logs`, requestOptions),
      fetch(`${API_URL}/instances/${serverId}/stats`, requestOptions),
    ]);

    const responses = await Promise.all([
      statusRes.ok ? statusRes.json() : handleErrorResponse(statusRes),
      logsRes.ok ? logsRes.json() : handleErrorResponse(logsRes),
      statsRes.ok ? statsRes.json() : handleErrorResponse(statsRes),
    ]);

    const [statusData, logsData, statsData] = responses;

    if (!statusData || !logsData || !statsData) return null;

    return {
      status: statusData.data.status,
      logs: logsData.data.logs,
      stats: statsData.data,
    };
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to fetch server data';
    toast.error(errorMessage, { autoClose: 5000 });
    return null;
  }
};

// Update handleCommand function
const handleCommand = async (serverId: string, command: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
    },
    body: JSON.stringify({ command }),
  };

  try {
    const response = await fetch(
      `${API_URL}/instances/${serverId}/command`,
      requestOptions,
    );

    if (!response.ok) {
      await handleErrorResponse(response);
      return null;
    }

    const data = await response.json();

    if (!(data.message === 'success')) {
      toast.error(data.message || 'Operation failed');
      return null;
    }

    return data.data.output;
  } catch (error: any) {
    const errorMessage = error.message || 'Failed to execute command';
    toast.error(errorMessage, { autoClose: 5000 });
    return null;
  }
};

// Add new interface for console entries
interface ConsoleEntry {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: string;
}

// Separate ConsoleTab component to prevent full page re-renders
const ConsoleTab = ({ serverId }: { serverId: string }) => {
  const [consoleHistory, setConsoleHistory] = useState<ConsoleEntry[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Effect for fetching initial logs
  useEffect(() => {
    const fetchInitialLogs = async () => {
      const data = await consoleService.fetchServerData(serverId);
      if (data?.logs) {
        setConsoleHistory(data.logs);
      }
    };
    fetchInitialLogs();
  }, [serverId]);

  const handleCommandSubmit = async (command: string) => {
    if (!command.trim()) {
      toast.error('Please enter a command');
      return;
    }

    setIsExecuting(true);

    try {
      const newCommand: ConsoleEntry = {
        type: 'command',
        content: command,
        timestamp: new Date().toISOString(),
      };

      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
      setConsoleHistory(prev => [...prev, newCommand]);
      setCommandInput('');

      const output = await consoleService.executeCommand(serverId, command);

      if (output) {
        const outputLines = output.split('\n').filter(Boolean);

        const outputEntries: ConsoleEntry[] = outputLines.map(line => ({
          type: 'output',
          content: line,
          timestamp: new Date().toISOString(),
        }));

        if (outputEntries.length === 0) {
          outputEntries.push({
            type: 'output',
            content: 'Command executed successfully with no output',
            timestamp: new Date().toISOString(),
          });
        }

        setConsoleHistory(prev => [...prev, ...outputEntries]);
      }
    } catch (error: any) {
      const errorEntry: ConsoleEntry = {
        type: 'error',
        content: error.message || 'Command execution failed',
        timestamp: new Date().toISOString(),
      };
      setConsoleHistory(prev => [...prev, errorEntry]);
      toast.error(errorEntry.content, { autoClose: 5000 });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommandInput('');
      }
    }
  };

  return (
    <div className="space-y-4">
      <ConsoleOutput logs={consoleHistory.map(entry => entry.content)} />
      <div className="flex space-x-2">
        <input
          type="text"
          value={commandInput}
          onChange={e => setCommandInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyPress={e =>
            e.key === 'Enter' && handleCommandSubmit(commandInput)
          }
          placeholder="Enter command..."
          className="flex-1 rounded-lg border-gray-300"
          disabled={isExecuting}
        />
        <button
          onClick={() => handleCommandSubmit(commandInput)}
          disabled={isExecuting}
          className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors disabled:opacity-50"
        >
          Execute
        </button>
      </div>
    </div>
  );
};

// Add new interface for server data
interface ServerData {
  status: string;
  stats: any; // Replace 'any' with proper type if available
}

// Update main Console component
export const Console = () => {
  const { blog_id } = useParams<{ blog_id: string }>();
  const [serverId, setServerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('console');
  const [serverData, setServerData] = useState<ServerData>({
    status: 'running',
    stats: null,
  });
  const [loading, setLoading] = useState(true);

  // Memoize the fetch function to prevent recreating it on every render
  const fetchServerData = React.useCallback(async () => {
    if (!serverId) return;

    try {
      const data = await consoleService.fetchServerData(serverId);
      if (data) {
        setServerData(prev => {
          // Only update if data has changed
          if (
            prev.status !== data.status ||
            JSON.stringify(prev.stats) !== JSON.stringify(data.stats)
          ) {
            return { status: data.status, stats: data.stats };
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  }, [serverId]);

  // Effect for fetching server ID - runs once
  useEffect(() => {
    const fetchServerId = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/${blog_id}/server`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bloggrs:token'),
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch server details');
        }

        const data = await response.json();
        setServerId(data.data.server_id);
      } catch (error) {
        console.error('Error fetching server ID:', error);
        toast.error('Failed to connect to server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (blog_id) {
      fetchServerId();
    }
  }, [blog_id]);

  // Effect for periodic status updates
  useEffect(() => {
    if (!serverId) return;

    // Initial fetch
    fetchServerData();

    // Set up interval
    const intervalId = setInterval(fetchServerData, 5000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [serverId, fetchServerData]);

  // Memoize server control handlers
  const handleServerControl = React.useCallback(
    async (action: 'start' | 'stop' | 'restart') => {
      if (!serverId) return;

      const success = await consoleService.controlServer(serverId, action);
      if (success) {
        setServerData(prev => ({
          ...prev,
          status: action === 'stop' ? 'stopped' : 'running',
        }));
      }
    },
    [serverId],
  );

  // Loading state component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">
                {serverId
                  ? 'Loading server data...'
                  : 'Connecting to server...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Server Status Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ServerIcon className="h-6 w-6 text-gray-400" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Server Console
                </h1>
                <p className="text-sm text-gray-500">ID: {serverId}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  serverData.status === 'running'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {serverData.status.charAt(0).toUpperCase() +
                  serverData.status.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() =>
                  handleServerControl(
                    serverData.status === 'running' ? 'stop' : 'start',
                  )
                }
                className={`px-4 py-2 rounded-lg transition-colors ${
                  serverData.status === 'running'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {serverData.status === 'running'
                  ? 'Stop Server'
                  : 'Start Server'}
              </button>
              <button
                onClick={() => handleServerControl('restart')}
                className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors"
              >
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
              {tabs.map(tab => (
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
            {activeTab === 'console' && serverId && (
              <ConsoleTab serverId={serverId} />
            )}
            {activeTab === 'files' && <FileManager />}
            {activeTab === 'settings' && <SettingsContent />}
            {activeTab === 'stats' && <StatisticsContent />}
            {activeTab === 'backups' && <BackupsContent />}
            {activeTab === 'ftp' && <FileZillaCredentials />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add near the top with other imports
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
);
