import { MainPanel } from 'app/components/MainPanel';
import { PostContentEditor } from 'app/components/PostContentEditor';
import { useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Helmet } from 'react-helmet-async';
import ContentEditable from 'react-contenteditable';
import { blogsService } from 'services/blogs.service';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from 'draft-js';
import { Loading } from 'app/components/Loading';
import { NotAuthorized } from 'app/components/NotAuthorized';
// import RichTextEditor from 'react-rte';
import { SEOPanel } from 'app/components/EditBlog/panels/SEOPanel';
import { EngagementPanel } from 'app/components/EditBlog/panels/EngagementPanel';
import { DesignPanel } from 'app/components/EditBlog/panels/DesignPanel';
import { MonetizationPanel } from 'app/components/EditBlog/panels/MonetizationPanel';

import { CollaborationTools } from 'app/components/EditBlog/tools/CollaborationTools';
import { Analytics } from 'app/components/EditBlog/settings/Analytics';
import { AccessibilityChecker } from 'app/components/EditBlog/panels/AccessibilityChecker';
import { IntegrationsPanel } from 'app/components/EditBlog/panels/IntegrationsPanel';
import { PublishStatus } from 'app/components/EditBlog/components/PublishStatus';
import { SaveButton } from 'app/components/EditBlog/components/SaveButton';
import { PreviewButton } from 'app/components/EditBlog/components/PreviewButton';
import { VersionHistoryDropdown } from 'app/components/EditBlog/components/VersionHistoryDropdown';
import { SettingsButton } from 'app/components/EditBlog/components/SettingsButton';
import { WordCount } from 'app/components/EditBlog/components/WordCount';
import { ReadingTime } from 'app/components/EditBlog/components/ReadingTime';
import { PerformanceStatus } from 'app/components/EditBlog/components/PerformanceStatus';
import { PublishSettings } from 'app/components/EditBlog/components/PublishSettings';
import { ChevronLeft } from 'react-feather';



export const CreatePost = ({ match }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const titleContentEditableRef = useRef();
  const [title, setTitle] = useState(
    '15 bloggers share their advice for successful blogging',
  );
  const [editorState, setEditorState] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [categoriesQuery, setCategoriesQuery] = useState('');
  const [categories, setCategories] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const { blog_id } = match.params;

  const [hasAccess, setHasAccess] = useState(true);

  const [activeTab, setActiveTab] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState('Never');
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: '',
    metaDescription: '',
    // ... other SEO settings
  });

  const [designSettings, setDesignSettings] = useState({
    template: 'default',
    colors: { primary: '#000000', secondary: '#ffffff' },
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
    templates: [
      { id: 'default', name: 'Default Template' },
      { id: 'modern', name: 'Modern Template' },
    ],
    // ... other design settings
  });

  const [engagementSettings, setEngagementSettings] = useState({
    comments: {
      enabled: true,
      requireModeration: true,
      allowReplies: true
    },
    newsletter: {
      enabled: true,
      position: 'bottom'
    },
    socialSharing: {
      enabled: true,
      platforms: ['facebook', 'twitter', 'linkedin']
    }
  });

  const [monetizationSettings, setMonetizationSettings] = useState({
    adsEnabled: false,
    subscriptionRequired: false,
    affiliateLinks: [],
    adSpots: [],
    subscriptionPlans: [],
    paywallRules: [],
    paywallContent: {
      title: 'Subscribe to Continue Reading'
    }
  });

  const [thumbnail, setThumbnail] = useState('');

  useEffect(async () => {
    const categories = await blogsService.getBlogCategories(
      blog_id,
      categoriesQuery,
    );
    setCategories(categories);
  }, [categoriesQuery]);

  useEffect(async () => {
    if (createMode) return;
    try {
      const post = await blogsService.getPost(id);
      const categories = await blogsService.getBlogCategories(
        blog_id,
        categoriesQuery,
      );
      if (post && post.postcategories) {
        const newSelectedCategories = post.postcategories
          .map(pc => categories.find(cat => cat.id === pc.CategoryId))
          .filter(i => i !== undefined);
        setSelectedCategories(newSelectedCategories);
      }
    } catch (err) {
      console.error('Error loading post categories:', err);
      toast.error('Failed to load post categories');
    }
  }, []);

  const { id } = match.params;
  const createMode = id === 'create';

  useEffect(async () => {
    if (!categories) return;
    const { id } = match.params;
    if (createMode) return setLoading(false);

    try {
      const post = await blogsService.getPost(id);
      if (post) {
        setTitle(post.title);
        const blocks = JSON.parse(post.html_content);
        setBlocks(blocks);
      }
    } catch (err) {
      console.error('Error loading post:', err);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  }, [categories]);

  const handleSave = async () => {
    const { blog_id: BlogId, id } = match.params;
    
    try {
      // Get current editor content
      const blocks = await editorState.current.save();
      const html_content = JSON.stringify(blocks);

      // Prepare post data
      const postData = {
        title,
        html_content,
        BlogId,
        categories: selectedCategories.map(cat => ({ id: cat.id })),
        status: 'published',
        thumbnail
      };

      // Create or update post
      const fn = createMode ? blogsService.createBlogPost : blogsService.updateBlogPost;
      if (!createMode) {
        postData.id = id;
      }

      const post = await fn(postData);

      // Show success message
      toast.success(createMode ? 'Post published successfully!' : 'Post updated successfully!');

      // Redirect after create
      if (createMode) {
        history.push(`/blogs/${BlogId}/posts/${post.id}`);
      }

    } catch (err) {
      console.error('Error saving post:', err);
      toast.error(createMode ? 'Failed to publish post' : 'Failed to update post');
    }
  };

  useEffect(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    const timer = setTimeout(() => {
      handleAutoSave();
    }, 30000);
    setAutoSaveTimer(timer);
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [blocks]);

  const handleAutoSave = async () => {
    // Implement save logic here
    setLastSavedTime(new Date().toLocaleTimeString());
  };

  if (!hasAccess) return <NotAuthorized />;
  if (loading || (!blocks && !createMode)) return <Loading />;

  return (
    <MainPanel>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Top Action Bar */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center" style={{ marginLeft: "3%"}}>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => history.goBack()}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1">Back</span>
            </button>
            <PublishStatus />
            <SaveButton onClick={handleSave} createMode={createMode} />
            <PreviewButton />
          </div>
          <div className="flex items-center space-x-4">
            <VersionHistoryDropdown />
            <SettingsButton />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-100">
                {['Content', 'Design', 'SEO', 'Engagement', 'Monetization', 'Accessibility', 'Integrations'].map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-4 font-medium text-sm transition-colors
                      ${activeTab === index 
                        ? 'text-[#1a365d] border-b-2 border-[#1a365d]' 
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {activeTab === 0 && (
                <div className="space-y-8">
                  {/* Title */}
                  <ContentEditable
                    innerRef={titleContentEditableRef}
                    html={title}
                    disabled={false}
                    onChange={evt => setTitle(evt.target.value)}
                    tagName="h1"
                    className="text-3xl font-semibold text-gray-800 focus:outline-none hover:bg-gray-50 transition-colors p-2 rounded-lg"
                  />

                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Featured Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setThumbnail(URL.createObjectURL(file));
                        }
                      }}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-[#1a365d] file:text-white
                        hover:file:bg-[#2a4365]
                        transition-colors"
                    />
                    {thumbnail && (
                      <img 
                        src={thumbnail} 
                        alt="Post thumbnail" 
                        className="mt-2 h-32 w-32 object-cover rounded-lg border border-gray-200"
                      />
                    )}
                  </div>

                  {/* Editor */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <PostContentEditor
                      defaultValue={blocks}
                      editorState={editorState}
                      onInitialize={setEditorState}
                    />
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <DesignPanel 
                  settings={designSettings}
                  onChange={setDesignSettings}
                  components={{
                    TemplateSelector: {},
                    LayoutBuilder: {},
                    ColorSchemeManager: {},
                    TypographyControls: {},
                    CustomCSS: {},    
                    templates: [
                      { id: 'default', name: 'Default Template' },
                      { id: 'modern', name: 'Modern Template' },
                    ],
                    blocks: []
                  }}
                />
              )}
              {activeTab === 2 && (
                <SEOPanel 
                  settings={seoSettings}
                  onChange={setSeoSettings}
                />
              )}
              {activeTab === 3 && (
                <EngagementPanel 
                  components={{
                    CommentSettings,
                    NewsletterForm,
                    SocialSharing,
                    RelatedPosts,
                    TableOfContents
                  }}
                />
              )}
              {activeTab === 4 && (
                <MonetizationPanel 
                  settings={monetizationSettings}
                  onChange={setMonetizationSettings}
                  features={{
                    adProviders: [],
                    subscriptionFeatures: [],
                    affiliatePrograms: []
                  }}
                />
              )}
              {activeTab === 5 && (
                <AccessibilityChecker 
                  features={{
                    wcagCompliance: {},
                    screenReader: {},
                    colorContrast: {},
                  }}
                />
              )}
              {activeTab === 6 && (
                <IntegrationsPanel 
                  connections={{
                    socialMedia: {},
                    emailMarketing: {},
                    analytics: {},
                    ecommerce: {},
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="bg-white border-t px-6 py-3 flex justify-between items-center" style={{ marginLeft: "3%"}}>
          <div className="text-sm text-gray-500">
            Last saved: {lastSavedTime}
          </div>
          <div className="flex items-center space-x-6">
            <WordCount content={blocks ? JSON.stringify(blocks) : ''} />
            <ReadingTime content={blocks ? JSON.stringify(blocks) : ''} />
            <PerformanceStatus />
          </div>
        </div>
      </div>
    </MainPanel>
  );
};

const CommentSettings = () => {
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
        {/* Add other settings controls */}
      </div>
    </div>
  );
};

const NewsletterForm = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    position: 'bottom',
    title: 'Subscribe to our newsletter',
    description: 'Get the latest updates directly in your inbox.',
    buttonText: 'Subscribe Now'
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Newsletter Form</h3>
      <div className="space-y-3">
        <input
          type="text"
          value={settings.title}
          onChange={e => setSettings({...settings, title: e.target.value})}
          className="block w-full border rounded p-2"
          placeholder="Form Title"
        />
        {/* Add other newsletter controls */}
      </div>
    </div>
  );
};

const SocialSharing = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    platforms: ['facebook', 'twitter', 'linkedin'],
    position: 'bottom',
    showShareCount: true
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Social Sharing</h3>
      <div className="space-y-3">
        {['facebook', 'twitter', 'linkedin', 'pinterest'].map(platform => (
          <label key={platform} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.platforms.includes(platform)}
              onChange={e => {
                const newPlatforms = e.target.checked
                  ? [...settings.platforms, platform]
                  : settings.platforms.filter(p => p !== platform);
                setSettings({...settings, platforms: newPlatforms});
              }}
            />
            <span className="capitalize">{platform}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const RelatedPosts = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    count: 3,
    layout: 'grid',
    showThumbnail: true,
    showExcerpt: true,
    matchBy: ['category', 'tags']
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Related Posts</h3>
      <div className="space-y-3">
        <select 
          value={settings.layout}
          onChange={e => setSettings({...settings, layout: e.target.value})}
          className="block w-full border rounded p-2"
        >
          <option value="grid">Grid Layout</option>
          <option value="list">List Layout</option>
        </select>
        {/* Add other related posts controls */}
      </div>
    </div>
  );
};

const TableOfContents = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    position: 'right',
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
        {/* Add other TOC controls */}
      </div>
    </div>
  );
};
