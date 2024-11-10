import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { SEOPanel } from './panels/SEOPanel';
import { EngagementPanel } from './panels/EngagementPanel';
import { DesignPanel } from './panels/DesignPanel';
import { MonetizationPanel } from './panels/MonetizationPanel';

import { CollaborationTools } from './tools/CollaborationTools';
import { Analytics } from './settings/Analytics';
import { AccessibilityChecker } from './panels/AccessibilityChecker';
import { IntegrationsPanel } from './panels/IntegrationsPanel';
import { PublishStatus } from './components/PublishStatus';
import { SaveButton } from './components/SaveButton';
import { PreviewButton } from './components/PreviewButton';
import { VersionHistoryDropdown } from './components/VersionHistoryDropdown';
import { SettingsButton } from './components/SettingsButton';
import { WordCount } from './components/WordCount';
import { ReadingTime } from './components/ReadingTime';
import { PerformanceStatus } from './components/PerformanceStatus';
import { PublishSettings } from './components/PublishSettings';

interface BlogData {
  content?: string;
  // Add other blog data properties as needed
}

interface EditBlogProps {
  blogId: string;
  initialData?: BlogData;
}

// Add this interface before the EditBlog component
interface DesignSettings {
  template: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: { 
    headings: {
      h1: { size: string; weight: string; lineHeight: string; };
      h2: { size: string; weight: string; lineHeight: string; };
      h3: { size: string; weight: string; lineHeight: string; };
      h4: { size: string; weight: string; lineHeight: string; };
      h5: { size: string; weight: string; lineHeight: string; };
      h6: { size: string; weight: string; lineHeight: string; };
    };
    body: {
      size: string;
      lineHeight: string;
      paragraphSpacing: string;
    };
    fontFamily: string;
    fontSize: string;
  };
  layout: string;
  fonts: string[];
  fontSizes: string[];
  customCSS: string;
}

// Add this interface before the EditBlog component
interface DesignComponents {
  TemplateSelector: any;
  LayoutBuilder: any;
  ColorSchemeManager: any;
  TypographyControls: any;
  CustomCSS: any;
  templates: any[];
  blocks: any[];
}

// Add this interface before the EditBlog component
interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
  robotsDirectives: string;
  content: string;
  schemaType: string;
  schemaData: any;
}

// Add this interface before the EditBlog component
interface SEOTools {
  MetaEditor: any;
  SchemaMarkup: any;
  KeywordOptimizer: any;
  SocialPreview: any;
}

// Add this interface before the EditBlog component
interface MonetizationSettings {
  adsEnabled: boolean;
  subscriptionRequired: boolean;
  affiliateLinks: any[];
  adSpots: any[];
  subscriptionPlans: any[];
  paywallRules: any[];
  paywallContent: PaywallContent;
}

// Add this interface for paywall content
interface PaywallContent {
  title: string;
  description?: string;
  buttonText?: string;
  plans?: any[];
}

// Replace the existing MonetizationFeatures interface with this one
interface MonetizationFeatures {
  adProviders: any[];
  subscriptionFeatures: any[];
  affiliatePrograms: any[];
}

interface MonetizationPanelProps {
  settings: MonetizationSettings;
  onChange: (settings: Partial<MonetizationSettings>) => void;
  features: MonetizationFeatures;
}

// Add this interface before the EditBlog component
interface AnalyticsMetrics {
  pageViews: number;
  engagement: {
    timeOnPage: number;
    scrollDepth: number;
    interactions: number;
    commentCount: number;
  };
  traffic: number;
  heatmaps: Record<string, any>;
  averageReadTime: number;
  bounceRate: number;
  trafficSources: Record<string, number>;
  sourceTrends: Record<string, number[]>;
  userBehavior: {
    scrollDepth: number;
    clickPatterns: Record<string, number>;
  };
  conversionRate: number;
  socialShares: Record<string, number>;
}

// Add this interface before the EditBlog component
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
    color?: string;
  };
  canReview?: boolean;
}

// Add this interface for EngagementPanelComponents
interface EngagementPanelComponents {
  CommentSettings: React.ComponentType;
  NewsletterForm: React.ComponentType;
  SocialSharing: React.ComponentType;
  RelatedPosts: React.ComponentType;
  TableOfContents: React.ComponentType;
}

// Add placeholder components
const PlaceholderComponent: React.FC = () => <div>Component coming soon...</div>;

// Add these new components at the top of the file
const TabList: React.FC<{
  children: React.ReactNode;
  vertical?: boolean;
}> = ({ children, vertical }) => (
  <div className={`flex ${vertical ? 'flex-col' : ''} ${vertical ? 'space-y-1' : 'space-x-2'} ${vertical ? 'p-4' : 'px-6 py-3'} bg-white border-b border-gray-200`}>
    {children}
  </div>
);

const TabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
  <button
    className={`px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive 
        ? 'bg-[#1a365d] text-white shadow-sm' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Add these new components after the existing interfaces
const CommentSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    requireModeration: true,
    allowReplies: true,
    notifyOnNewComments: true,
    allowAnonymous: false,
    sortBy: 'newest'
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Comment Settings</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={e => setSettings({...settings, enabled: e.target.checked})}
          />
          <span>Enable comments</span>
        </label>
        {/* Add other toggle options similarly */}
        <select 
          value={settings.sortBy}
          onChange={e => setSettings({...settings, sortBy: e.target.value})}
          className="block w-full border rounded p-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
};

const NewsletterForm: React.FC = () => {
  const [form, setForm] = useState({
    enabled: true,
    position: 'bottom', // top, bottom, popup, inline
    title: 'Subscribe to our newsletter',
    description: 'Get the latest updates directly in your inbox.',
    buttonText: 'Subscribe Now',
    collectName: true
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Newsletter Form</h3>
      <div className="space-y-3">
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
          className="block w-full border rounded p-2"
          placeholder="Form Title"
        />
        <select 
          value={form.position}
          onChange={e => setForm({...form, position: e.target.value})}
          className="block w-full border rounded p-2"
        >
          <option value="bottom">Bottom of Post</option>
          <option value="top">Top of Post</option>
          <option value="popup">Popup</option>
          <option value="inline">Inline</option>
        </select>
      </div>
    </div>
  );
};

const SocialSharing: React.FC = () => {
  const [platforms, setPlatforms] = useState({
    facebook: true,
    twitter: true,
    linkedin: true,
    pinterest: false,
    email: true
  });

  const [position, setPosition] = useState('bottom'); // top, bottom, floating

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Social Sharing</h3>
      <div className="space-y-3">
        {Object.entries(platforms).map(([platform, enabled]) => (
          <label key={platform} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={e => setPlatforms({...platforms, [platform]: e.target.checked})}
            />
            <span className="capitalize">{platform}</span>
          </label>
        ))}
        <select 
          value={position}
          onChange={e => setPosition(e.target.value)}
          className="block w-full border rounded p-2"
        >
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
          <option value="floating">Floating Sidebar</option>
        </select>
      </div>
    </div>
  );
};

const RelatedPosts: React.FC = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    count: 3,
    layout: 'grid', // grid, list
    showThumbnail: true,
    showExcerpt: true,
    matchBy: ['category', 'tags']
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Related Posts</h3>
      <div className="space-y-3">
        <input
          type="number"
          value={settings.count}
          onChange={e => setSettings({...settings, count: parseInt(e.target.value)})}
          className="block w-full border rounded p-2"
          min="1"
          max="6"
        />
        <select 
          value={settings.layout}
          onChange={e => setSettings({...settings, layout: e.target.value})}
          className="block w-full border rounded p-2"
        >
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>
    </div>
  );
};

const TableOfContents: React.FC = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    position: 'right', // left, right, top
    sticky: true,
    maxDepth: 3,
    smooth: true,
    numbered: true
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Table of Contents</h3>
      <div className="space-y-3">
        <select 
          value={settings.position}
          onChange={e => setSettings({...settings, position: e.target.value})}
          className="block w-full border rounded p-2"
        >
          <option value="right">Right Sidebar</option>
          <option value="left">Left Sidebar</option>
          <option value="top">Top of Content</option>
        </select>
        <input
          type="number"
          value={settings.maxDepth}
          onChange={e => setSettings({...settings, maxDepth: parseInt(e.target.value)})}
          className="block w-full border rounded p-2"
          min="1"
          max="6"
        />
      </div>
    </div>
  );
};

// Add this interface before the EditBlog component
interface IntegrationsPanelProps {
  connections: {
    socialMedia: Record<string, any>;
    emailMarketing: Record<string, any>;
    analytics: Record<string, any>;
    ecommerce: Record<string, any>;
  };
}

export const EditBlog: React.FC<EditBlogProps> = ({ blogId, initialData }) => {
  // Core States
  const [content, setContent] = useState(initialData?.content || '');
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout>();
  const [activeTab, setActiveTab] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Never');
  
  // Feature-specific States
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: '',
    metaDescription: '',
    mainKeyword: '',
    secondaryKeywords: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary_large_image',
    canonicalUrl: '',
    robotsDirectives: 'index,follow',
    content: '',
    schemaType: 'Article',
    schemaData: {}
  });
  
  const [designSettings, setDesignSettings] = useState<DesignSettings>({
    template: 'default',
    colors: { 
      primary: '#000000', 
      secondary: '#ffffff',
      background: '#ffffff',
      text: '#000000'
    },
    typography: {
      headings: {
        h1: { size: '2.5rem', weight: '700', lineHeight: '1.2' },
        h2: { size: '2rem', weight: '600', lineHeight: '1.3' },
        h3: { size: '1.75rem', weight: '600', lineHeight: '1.3' },
        h4: { size: '1.5rem', weight: '600', lineHeight: '1.4' },
        h5: { size: '1.25rem', weight: '600', lineHeight: '1.4' },
        h6: { size: '1rem', weight: '600', lineHeight: '1.4' }
      },
      body: {
        size: '1rem',
        lineHeight: '1.5',
        paragraphSpacing: '1.5rem'
      },
      fontFamily: 'Arial',
      fontSize: '16px'
    },
    layout: 'standard',
    fonts: ['Arial', 'Helvetica'],
    fontSizes: ['12px', '14px', '16px'],
    customCSS: ''
  });
  
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationSettings>({
    adsEnabled: false,
    subscriptionRequired: false,
    affiliateLinks: [],
    adSpots: [],
    subscriptionPlans: [],
    paywallRules: [],
    paywallContent: {
      title: 'Subscribe to Continue Reading',
      description: 'Get unlimited access to all our content',
      buttonText: 'Subscribe Now',
      plans: []
    }
  });
  
  const [collaborators, setCollaborators] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: {
        id: "editor-role",
        name: "editor",
        permissions: ["edit", "review", "comment"],
        color: "#4A90E2"
      },
      canReview: true
    }
  ]);

  // Add state for publish settings
  const [isPublic, setIsPublic] = useState(false);

  const handleAutoSave = async () => {
    // TODO: Implement your save logic here
    console.log('Auto-saving content:', content);
    setLastSavedTime(new Date().toLocaleTimeString());
  };

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    const timer = setTimeout(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds
    setAutoSaveTimer(timer);
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [content]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Action Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <PublishStatus />
          <SaveButton />
          <PreviewButton />
        </div>
        <div className="flex items-center space-x-4">
          <VersionHistoryDropdown />
          <SettingsButton />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Section */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white border-b border-gray-200">
            <TabList>
              {['Content', 'Design', 'SEO', 'Engagement', 'Monetization'].map((tab, index) => (
                <TabButton
                  key={tab}
                  isActive={activeTab === index}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </TabButton>
              ))}
            </TabList>
          </div>
          
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {activeTab === 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <Editor
                    initialValue={initialData?.content}
                    onChange={(e) => setContent(e.target.getContent())}
                    plugins={[
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                      'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                      'fullscreen', 'insertdatetime', 'media', 'table', 'code',
                      'help', 'wordcount', 'markdown'
                    ]}
                  />
                </div>
              )}
              {activeTab === 1 && (
                <DesignPanel 
                  settings={designSettings}
                  onChange={(val: Partial<DesignSettings>) => setDesignSettings(prev => ({ ...prev, ...val }))}
                  components={{
                    TemplateSelector: {},
                    LayoutBuilder: {},
                    ColorSchemeManager: {},
                    TypographyControls: {},
                    CustomCSS: {},    
                    templates: [],
                    blocks: []
                  } as DesignComponents}
                />
              )}
              {activeTab === 2 && (
                <SEOPanel 
                  settings={seoSettings}
                  onChange={(settings: Partial<SEOSettings>) => setSeoSettings(prev => ({ ...prev, ...settings }))}
                  tools={{
                    MetaEditor: {},
                    SchemaMarkup: {},
                    KeywordOptimizer: {},
                    SocialPreview: {},
                  } as SEOTools}
                />
              )}
              {activeTab === 3 && (
                <EngagementPanel 
                  components={{
                    CommentSettings,
                    NewsletterForm,
                    SocialSharing,
                    RelatedPosts,
                    TableOfContents,
                  }}
                />
              )}
              {activeTab === 4 && (
                <MonetizationPanel 
                  settings={monetizationSettings}
                  onChange={(settings: Partial<MonetizationSettings>) => 
                    setMonetizationSettings({...monetizationSettings, ...settings})}
                  features={{
                    adProviders: [],
                    subscriptionFeatures: [],
                    affiliatePrograms: []
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
          <TabList vertical>
            {['Publish', 'Analytics', 'Collaboration', 'Accessibility', 'Integrations'].map((tab, index) => (
              <TabButton
                key={tab}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </TabButton>
            ))}
          </TabList>
          
          <div className="p-4">
            {activeTab === 0 && (
              <PublishSettings 
                isPublic={isPublic}
                onPublishChange={setIsPublic}
              />
            )}
            {activeTab === 1 && (
              <Analytics 
                metrics={{
                  pageViews: 0,
                  engagement: {
                    timeOnPage: 0,
                    scrollDepth: 0,
                    interactions: 0,
                    commentCount: 0
                  },
                  traffic: 0,
                  heatmaps: {},
                  averageReadTime: 0,
                  bounceRate: 0,
                  trafficSources: [
                    {
                      source: 'Direct',
                      count: 0,
                      visits: 0,
                      percentage: 0
                    },
                    {
                      source: 'Search',
                      count: 0,
                      visits: 0,
                      percentage: 0
                    },
                    {
                      source: 'Social',
                      count: 0,
                      visits: 0,
                      percentage: 0
                    }
                  ],
                  sourceTrends: {},
                  userBehavior: {
                    scrollDepth: 0,
                    clickPatterns: {}
                  },
                  conversionRate: 0,
                  socialShares: {},
                  popularContent: [],
                  contentEngagement: {
                    comments: 0,
                    likes: 0,
                    shareCount: 0
                  },
                  clickMap: [],
                  scrollDepth: [],
                  attentionHotspots: [],
                  conversionGoals: [],
                  goalPerformance: {
                    daily: 0,
                    weekly: 0,
                    monthly: 0
                  }
                }}
              />
            )}
            {activeTab === 2 && (
              <CollaborationTools
                team={collaborators}
                onUpdate={setCollaborators}
                features={{
                  availableRoles: [
                    {
                      id: "editor-role",
                      name: "Editor",
                      permissions: ["edit", "review", "comment"],
                      color: "#4A90E2"
                    },
                    {
                      id: "viewer-role",
                      name: "Viewer",
                      permissions: ["view", "comment"],
                      color: "#7ED321"
                    }
                  ],
                  pendingReviews: [],
                  communicationThreads: [],
                  recentActivities: [],
                  activityFilters: []
                }}
              />
            )}
            {activeTab === 3 && (
              <AccessibilityChecker 
                features={{
                  wcagCompliance: {},
                  screenReader: {},
                  colorContrast: {},
                }}
              />
            )}
            {activeTab === 4 && (
              <IntegrationsPanel 
                integrations={{
                  googleAnalytics: {
                    enabled: false,
                    apiKey: ''
                  },
                  mailchimp: {
                    enabled: false,
                    apiKey: ''
                  },
                  facebook: {
                    enabled: false,
                    apiKey: ''
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Last saved: {lastSavedTime}
        </div>
        <div className="flex items-center space-x-6">
          <WordCount content={content} />
          <ReadingTime />
          <PerformanceStatus />
        </div>
      </div>
    </div>
  );
}; 