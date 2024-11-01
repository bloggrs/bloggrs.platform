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
      className="container min-h-screen max-w-7xl p-4 md:p-8 lg:p-12"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-center font-normal text-3xl md:text-4xl lg:text-5xl text-[#2B4B80] mb-12">
          Creating your blog...
        </h1>

        <div className="w-full max-w-2xl px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src="/dist/static/hugo-artificial-intelligence.png"
                className="w-32 h-32 md:w-40 md:h-40 object-contain mb-6"
                alt="Setup illustration"
              />
              <h2 className="text-center font-normal text-xl md:text-2xl text-[#2B4B80]">
                Step 1: Setting up posts...
              </h2>

              {/* Optional loading indicator */}
              <div className="mt-6 w-full max-w-md bg-gray-100 rounded-full h-2">
                <div className="bg-[#4B8CE8] h-2 rounded-full w-1/3 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
