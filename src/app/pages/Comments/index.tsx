import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeft, Code } from 'react-feather';

// Types
interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  status: 'approved' | 'pending' | 'spam';
}

// TabView Component
function TabView({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: 'all', label: 'All Comments' },
    { id: 'pending', label: 'Pending' },
    { id: 'spam', label: 'Spam' },
    { id: 'api', label: 'API' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

// CommentsList Component
function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch comments logic here
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'John Doe',
        content: 'Great article!',
        date: '2024-03-20',
        status: 'approved'
      },
      // Add more mock comments as needed
    ];
    setComments(mockComments);
  }, []);

  const handleAction = (commentId: string, action: 'approve' | 'spam' | 'delete') => {
    // Handle comment actions
    console.log(`${action} comment ${commentId}`);
  };

  return (
    <div className="mt-6">
      {comments.map(comment => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{comment.author}</h3>
              <p className="text-sm text-gray-500">{comment.date}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleAction(comment.id, 'approve')}
                className="text-green-500 hover:text-green-600"
              >
                Approve
              </button>
              <button 
                onClick={() => handleAction(comment.id, 'spam')}
                className="text-red-500 hover:text-red-600"
              >
                Spam
              </button>
              <button 
                onClick={() => handleAction(comment.id, 'delete')}
                className="text-gray-500 hover:text-gray-600"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}

// ModQueue Component
function ModQueue() {
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch pending comments logic here
    const mockPending: Comment[] = [
      {
        id: '2',
        author: 'Jane Smith',
        content: 'Pending comment',
        date: '2024-03-21',
        status: 'pending'
      },
    ];
    setPendingComments(mockPending);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Pending Comments</h2>
      <CommentsList />
    </div>
  );
}

// SpamQueue Component
function SpamQueue() {
  const [spamComments, setSpamComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch spam comments logic here
    const mockSpam: Comment[] = [
      {
        id: '3',
        author: 'Spam Bot',
        content: 'Spam content',
        date: '2024-03-21',
        status: 'spam'
      },
    ];
    setSpamComments(mockSpam);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Spam Comments</h2>
      <CommentsList />
    </div>
  );
}

// Settings Component
function Settings() {
  const [settings, setSettings] = useState({
    autoModeration: false,
    requireApproval: true,
    emailNotifications: true,
    blacklistedWords: '',
  });

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comment Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="font-medium">Auto Moderation</label>
          <input
            type="checkbox"
            checked={settings.autoModeration}
            onChange={(e) => handleSettingChange('autoModeration', e.target.checked)}
            className="toggle"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="font-medium">Require Approval</label>
          <input
            type="checkbox"
            checked={settings.requireApproval}
            onChange={(e) => handleSettingChange('requireApproval', e.target.checked)}
            className="toggle"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="font-medium">Email Notifications</label>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            className="toggle"
          />
        </div>
        <div>
          <label className="font-medium block mb-2">Blacklisted Words</label>
          <textarea
            value={settings.blacklistedWords}
            onChange={(e) => handleSettingChange('blacklistedWords', e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter words separated by commas"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

// APIReference Component
function APIReference() {
  const endpoints = [
    {
      method: 'GET',
      path: '/postcomments',
      description: 'List all comments with pagination and filtering',
      params: 'page, pageSize, status, query, PostId, BlogId'
    },
    {
      method: 'POST',
      path: '/postcomments',
      description: 'Create a new comment',
      auth: 'JWT Required'
    },
    {
      method: 'PATCH',
      path: '/postcomments/:id',
      description: 'Update comment status/content',
      auth: 'Admin Required'
    },
    {
      method: 'DELETE',
      path: '/postcomments/:id',
      description: 'Delete a comment',
      auth: 'Admin Required'
    }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Code className="w-5 h-5 mr-2" />
        API Reference
      </h2>
      <div className="space-y-4">
        {endpoints.map((endpoint, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded text-sm font-medium
                ${endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                  endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                  endpoint.method === 'PATCH' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}`}>
                {endpoint.method}
              </span>
              <code className="text-gray-700 font-mono">{endpoint.path}</code>
            </div>
            <p className="mt-2 text-gray-600">{endpoint.description}</p>
            {endpoint.params && (
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Parameters:</span> {endpoint.params}
              </p>
            )}
            {endpoint.auth && (
              <p className="mt-1 text-sm text-orange-600">
                <span className="font-medium">⚠️ {endpoint.auth}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main CommentsPage Component
export function CommentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const history = useHistory();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Action Bar */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center" style={{ marginLeft: '3%' }}>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => history.goBack()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-1">Back</span>
          </button>
          
          {/* Simplified Stats UI */}
          <div className="flex space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2"></div>
              <span>45 Approved</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></div>
              <span>23 Pending</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></div>
              <span>12 Spam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-100">
              {[
                { id: 'all', label: 'All Comments' },
                { id: 'pending', label: 'Pending' },
                { id: 'spam', label: 'Spam' },
                { id: 'api', label: 'API' },
                { id: 'settings', label: 'Settings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm transition-colors
                    ${activeTab === tab.id 
                      ? 'text-[#1a365d] border-b-2 border-[#1a365d]'
                      : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {activeTab === 'all' && <CommentsList />}
            {activeTab === 'pending' && <ModQueue />}
            {activeTab === 'spam' && <SpamQueue />}
            {activeTab === 'api' && <APIReference />}
            {activeTab === 'settings' && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
}