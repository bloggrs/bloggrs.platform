import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { blogsService } from '../../../../services/blogs.service';

export const BlogCreationStatus = ({
  sendValueToParent,
  parentData,
  nextStep,
}: any) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const {
      '/blog-category': BlogCategoryId,
      '/blog-logo': logo_url,
      '/blog-name': name,
    } = parentData;
    blogsService
      .createBlog({
        BlogCategoryId,
        logo_url: logo_url.slice(0, 100),
        name,
        description: '',
      })
      .then(blog => {
        // history.push('/blogs/create#/success?blog_id=' + blog.id);
        sendValueToParent(blog);
        nextStep();
      });
  }, []);
  return (
    <MainPanel
      sidebarProps={{ collapse: true }}
      className="min-h-screen bg-gray-50"
    >
      <div className="flex flex-col items-center justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl mb-8">
          Creating your blog
        </h1>

        <div className="w-full max-w-2xl">
          <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <img
                    src="/dist/static/hugo-artificial-intelligence.png"
                    className="object-contain"
                    alt="Setup illustration"
                  />
                  {/* Loading spinner overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B8CE8]"></div>
                  </div>
                </div>

                <h2 className="mt-6 text-xl font-medium text-gray-900 sm:text-2xl">
                  Setting up your blog
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  This may take a few moments...
                </p>

                {/* Progress bar */}
                <div className="mt-8 w-full max-w-md">
                  <div className="relative">
                    <div className="overflow-hidden h-2 bg-gray-100 rounded-full">
                      <div
                        className="animate-pulse h-2 bg-[#4B8CE8] rounded-full"
                        style={{ width: '33.33%' }}
                      />
                    </div>
                    {/* Steps indicators */}
                    <div className="mt-4 flex justify-between text-xs text-gray-500">
                      <div className="text-[#4B8CE8] font-medium">
                        Setting up posts
                      </div>
                      <div>Configuring theme</div>
                      <div>Final touches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
