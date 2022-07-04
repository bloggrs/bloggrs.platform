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
    <>
      <MainPanel
        sidebarProps={{ collapse: true }}
        className="container max-h-full max-w-7xl py-9 px-12"
      >
        <div className="px-2">
          <div className="flex">
            <div className="w-full w-6/6 lg:w-6/6 px-2">
              <h1 className="text-center font-normal text-5xl text-slate-700">
                Creation of DataAddict's Blog in progress...
              </h1>
              <div className="my-20 container w-3/6 lg:w-6/6 px-2">
                <div className="flex flex-inline">
                  <div className="w-6/6">
                    <div>
                      <img
                        src="/dist/static/hugo-artificial-intelligence.png"
                        className="py-2"
                      />
                      <h1 className="text-center font-normal text-2xl text-slate-700">
                        Step 1: Setting up posts...
                      </h1>
                    </div>
                  </div>
                </div>
                {/* <div class="flex flex-inline">
                <div class="w-4/6 bg-white overflow-y-scroll h-60 scrollbar-rounded scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-orange-100 h-32 overflow-y-scroll">
                  <p class="mx-10 my-2 text-blue-500">Travel</p>
                  <p class="mx-10 my-2 text-slate-500">Travel blog</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets store</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets subscriptions</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Show</p>
                  <p class="mx-10 my-2 text-slate-500">Travel blog</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets store</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets subscriptions</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Show</p>
                  <p class="mx-10 my-2 text-slate-500">Travel blog</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets store</p>
                  <p class="mx-10 my-2 text-slate-500">Travel tickets subscriptions</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Show</p>
                  <p class="mx-10 my-2 text-slate-500">Travel accessories</p>
                  <p class="mx-10 my-2 text-slate-500">Online Travel Accessories Shop</p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </MainPanel>
    </>
  );
};
