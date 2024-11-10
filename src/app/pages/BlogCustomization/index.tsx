import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor, Frame, Element } from '@craftjs/core';
import { Layout } from '../../../components/common/Layout';
import { Spinner } from '../../../components/common/Spinner';
import { Alert } from '../../../components/common/Alert';
import { EditBlog } from '../EditBlog';
import { blogsService } from '../../../services/blogs.service';
import { WidgetPreview } from './WidgetPreview';
import { WidgetCustomizer } from './WidgetCustomizer';
import { Widget } from '../../../types/Widget';
import { Helmet } from 'react-helmet-async';

// Add resolver components for CraftJS

import { WidgetToolbox } from './components/WidgetToolbox';
import { WidgetWrapper } from './components/WidgetWrapper';
import { RenderNode } from './components/RenderNode';
import { BlogPreview, BlogPreviewConfig } from './components/BlogPreview';

interface BlogCustomization {
  initialData: any;
  onSave: (updatedConfig: any) => Promise<void>;
  onCancel: () => void;
}

const { Sidebar, BlogPost, Header } = BlogPreviewConfig;
export const BlogCustomization: React.FC<BlogCustomization> = () => {
  const { blog_id } = useParams<{ blog_id: string }>();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<any>(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [previewConfig, setPreviewConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const data = await blogsService.getBlog(blog_id);
        setBlog(data);
        setWidgets(data.widgets || []);
      } catch (err) {
        setError('Failed to load blog');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [blog_id]);

  const handleWidgetChange = (widgetConfig: Record<string, any>) => {
    setPreviewConfig(widgetConfig);
  };

  const handleSave = async (updatedConfig: any) => {
    try {
      setLoading(true);
      const updatedBlog = {
        ...updatedConfig,
        widgets: widgets.map(w =>
          w.id === selectedWidget?.id ? { ...w, config: previewConfig } : w,
        ),
      };
      await blogsService.updateBlog(blog_id, updatedBlog);
      history.push('/blogs');
    } catch (err) {
      setError('Failed to save changes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWidgetSelect = (widget: Widget) => {
    setSelectedWidget(widget);
    setPreviewConfig(widget.config || {});
  };

  const resolverComponents = {
    BlogPreview,
    Header: BlogPreviewConfig.Header,
    BlogPost: BlogPreviewConfig.BlogPost,
    Sidebar: BlogPreviewConfig.Sidebar,
    WidgetWrapper,
    // Add CraftJS built-in elements
    Element: Element,
    Frame: Frame,
    // HTML elements
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    img: props => <img {...props} />,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  };

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert type="error" message={error} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="py-6">
          <header className="px-8 mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Edit Blog: {blog?.name}
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => history.push('/blogs')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </header>

          <Editor
            resolver={resolverComponents}
            enabled={true}
            onRender={RenderNode}
          >
            <div className="px-8">
              <div className="grid grid-cols-[250px_1fr_300px] gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <WidgetToolbox
                    widgets={widgets}
                    onWidgetSelect={handleWidgetSelect}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-auto">
                  <Frame>
                    <Element is="div" canvas id="root">
                      <BlogPreview
                        blog={blog}
                        widgets={widgets}
                        previewConfig={previewConfig}
                      >
                        <Header />
                        <div className="grid grid-cols-[1fr_300px] gap-6">
                          <BlogPost />
                          <Sidebar />
                        </div>
                      </BlogPreview>
                    </Element>
                  </Frame>
                </div>

                {selectedWidget && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <WidgetCustomizer
                      widget={selectedWidget}
                      currentConfig={previewConfig}
                      onConfigChange={handleWidgetChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </Editor>
        </div>
      </div>
    </Layout>
  );
};
