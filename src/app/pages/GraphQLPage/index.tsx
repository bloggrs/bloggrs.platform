import React, { useState } from 'react';
import { Search, Plus, Code, Settings, Activity, Lock, Database, Table } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { EnhancedGraphQLEditor } from './components/GraphQLEditor';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { SchemaVisualizer } from './components/SchemaVisualizer';
import { DataProviderForm } from './components/DataProviderForm';

// Mock data
const mockOperations = [
  {
    id: '1',
    name: 'getPost',
    description: 'Get a blog post by ID',
    returnType: 'Post',
    resolver: 'async (root, args) => { return Post.findById(args.id); }',
    deprecated: false
  },
  {
    id: '2', 
    name: 'createPost',
    description: 'Create a new blog post',
    returnType: 'Post',
    resolver: 'async (root, args) => { return Post.create(args.input); }',
    deprecated: false
  }
];

const mockPermissions = [
  {
    id: '1',
    role: 'admin',
    operations: ['*'],
    fields: ['*']
  },
  {
    id: '2',
    role: 'editor',
    operations: ['getPost', 'createPost'],
    fields: ['title', 'content']
  }
];

const mockMetrics = [
  {
    id: '1',
    operation: 'getPost',
    timestamp: new Date(),
    duration: 45,
    success: true,
    complexity: 2,
    depth: 3
  },
  {
    id: '2',
    operation: 'createPost', 
    timestamp: new Date(),
    duration: 120,
    success: false,
    error: 'Validation failed',
    complexity: 4,
    depth: 2
  }
];

const mockPlayground = {
  enabled: true,
  settings: {
    theme: 'dark',
    fontSize: 14
  },
  tabs: [
    {
      name: 'Query 1',
      query: 'query { posts { id title } }',
      variables: '{}'
    }
  ]
};

interface GraphQLOperation {
  id: string;
  name: string;
  description?: string;
  args?: any;
  returnType: string;
  resolver: string;
  deprecated?: boolean;
}

interface GraphQLPermission {
  id: string;
  role: string;
  operations: any;
  fields: any;
}

interface GraphQLMetric {
  id: string;
  operation: string;
  timestamp: Date;
  duration: number;
  success: boolean;
  error?: string;
  complexity?: number;
  depth?: number;
}

interface GraphQLPlayground {
  enabled: boolean;
  settings: {
    theme: string;
    fontSize: number;
  };
  tabs: Array<{
    name: string;
    query: string;
    variables: string;
  }>;
}

const GraphQLPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [activeTab, setActiveTab] = useState<'operations' | 'permissions' | 'metrics' | 'playground' | 'providers'>('operations');
  const [operations, setOperations] = useState<GraphQLOperation[]>(mockOperations);
  const [permissions, setPermissions] = useState<GraphQLPermission[]>(mockPermissions);
  const [metrics, setMetrics] = useState<GraphQLMetric[]>(mockMetrics);
  const [playground, setPlayground] = useState<GraphQLPlayground>(mockPlayground);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [editingItem, setEditingItem] = useState<any>(null);

  // Add new state for schema
  const [schema, setSchema] = useState(`
    type Query {
      posts: [Post]
      post(id: ID!): Post
    }
    type Post {
      id: ID!
      title: String!
      content: String!
    }
  `);

  // Add providers state if not already added
  const [providers, setProviders] = useState<any[]>([
    {
      id: '1',
      name: 'PostProvider',
      type: 'prisma',
      operation: 'getPost',
      model: 'Post',
      prismaQuery: {
        method: 'findUnique',
        where: { id: '$id' },
        select: ['id', 'title', 'content'],
        include: { author: true }
      }
    }
  ]);

  // Form Modal Component
  const FormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    type: 'create' | 'edit';
    item?: any;
  }> = ({ isOpen, onClose, onSubmit, type, item }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl"
      >
        {activeTab === 'providers' ? (
          <DataProviderForm
            initialData={item}
            operations={operations}
            onSubmit={(data) => {
              onSubmit(data);
              onClose();
            }}
          />
        ) : (
          <form onSubmit={e => { e.preventDefault(); onSubmit(item || {}); }} className="space-y-4">
            {activeTab === 'operations' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={item?.name || ''}
                    onChange={e => onSubmit({ ...item, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={item?.description || ''}
                    onChange={e => onSubmit({ ...item, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resolver</label>
                  <textarea
                    value={item?.resolver || ''}
                    onChange={e => onSubmit({ ...item, resolver: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {activeTab === 'permissions' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    value={item?.role || ''}
                    onChange={e => onSubmit({ ...item, role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Operations</label>
                  <textarea
                    value={Array.isArray(item?.operations) ? item.operations.join(', ') : item.operations}
                    onChange={e => onSubmit({ ...item, operations: e.target.value.split(',').map(op => op.trim()) })}
                    placeholder="Enter operations separated by commas"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fields</label>
                  <textarea
                    value={Array.isArray(item?.fields) ? item.fields.join(', ') : item.fields}
                    onChange={e => onSubmit({ ...item, fields: e.target.value.split(',').map(field => field.trim()) })}
                    placeholder="Enter fields separated by commas"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {type === 'create' ? 'Create' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    );
  };

  // Render functions for different sections
  const renderOperations = () => (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {operations.map(op => (
            <tr key={op.id}>
              <td className="px-6 py-4 whitespace-nowrap">{op.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{op.returnType}</td>
              <td className="px-6 py-4">{op.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    setModalType('edit');
                    setEditingItem(op);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPermissions = () => (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operations</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fields</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {permissions.map(perm => (
            <tr key={perm.id}>
              <td className="px-6 py-4 whitespace-nowrap">{perm.role}</td>
              <td className="px-6 py-4">{Array.isArray(perm.operations) ? perm.operations.join(', ') : perm.operations}</td>
              <td className="px-6 py-4">{Array.isArray(perm.fields) ? perm.fields.join(', ') : perm.fields}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    setModalType('edit');
                    setEditingItem(perm);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      <PerformanceMetrics data={metrics} />
      
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (ms)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complexity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metrics.map(metric => (
              <tr key={metric.id}>
                <td className="px-6 py-4 whitespace-nowrap">{metric.operation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    metric.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.success ? 'Success' : 'Failed'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.complexity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.timestamp.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlayground = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">GraphQL Playground</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={playground.enabled}
              onChange={e => setPlayground({...playground, enabled: e.target.checked})}
              className="mr-2"
            />
            Enable Playground
          </label>
          <button
            onClick={() => {/* Handle settings */}}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        <EnhancedGraphQLEditor
          schema={schema}
          query={playground.tabs[0].query}
          onQueryChange={(newQuery) => {
            const updatedTabs = [...playground.tabs];
            updatedTabs[0] = { ...updatedTabs[0], query: newQuery };
            setPlayground({ ...playground, tabs: updatedTabs });
          }}
        />

        <SchemaVisualizer schema={schema} />
      </div>
    </div>
  );

  const renderProviders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map(provider => (
              <tr key={provider.id}>
                <td className="px-6 py-4 whitespace-nowrap">{provider.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{provider.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{provider.operation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{provider.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(provider)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleCreate = () => {
    setModalType('create');
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (modalType === 'create') {
        if (activeTab === 'operations') {
          const newOperation = {
            id: String(operations.length + 1),
            ...data
          };
          setOperations([...operations, newOperation]);
        } else if (activeTab === 'permissions') {
          const newPermission = {
            id: String(permissions.length + 1),
            ...data
          };
          setPermissions([...permissions, newPermission]);
        } else if (activeTab === 'providers') {
          const newProvider = {
            id: String(providers.length + 1),
            ...data
          };
          setProviders([...providers, newProvider]);
        }
        toast.success(`${activeTab.slice(0,-1)} created successfully`);
      } else {
        if (activeTab === 'operations') {
          const updatedOperations = operations.map(op => 
            op.id === editingItem.id ? { ...op, ...data } : op
          );
          setOperations(updatedOperations);
        } else if (activeTab === 'permissions') {
          const updatedPermissions = permissions.map(perm =>
            perm.id === editingItem.id ? { ...perm, ...data } : perm
          );
          setPermissions(updatedPermissions);
        } else if (activeTab === 'providers') {
          const updatedProviders = providers.map(provider =>
            provider.id === editingItem.id ? { ...provider, ...data } : provider
          );
          setProviders(updatedProviders);
        }
        toast.success(`${activeTab.slice(0,-1)} updated successfully`);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Failed to save ${activeTab.slice(0,-1)}:`, error);
      toast.error(`Failed to save ${activeTab.slice(0,-1)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GraphQL Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your GraphQL operations, permissions, and monitor performance
          </p>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4">
            {[
              { id: 'operations', icon: Code, label: 'Operations' },
              { id: 'permissions', icon: Lock, label: 'Permissions' },
              { id: 'metrics', icon: Activity, label: 'Metrics' },
              { id: 'playground', icon: Database, label: 'Playground' },
              { id: 'providers', icon: Table, label: 'Data Providers' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          {(activeTab === 'operations' || activeTab === 'permissions' || activeTab === 'providers') && (
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New
            </button>
          )}
        </div>

        {activeTab === 'operations' && renderOperations()}
        {activeTab === 'permissions' && renderPermissions()}
        {activeTab === 'metrics' && renderMetrics()}
        {activeTab === 'playground' && renderPlayground()}
        {activeTab === 'providers' && renderProviders()}

        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          type={modalType}
          item={editingItem}
        />
      </div>
    </div>
  );
};

export { GraphQLPage};