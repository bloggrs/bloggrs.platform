import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';
import { BlogOverviewCard } from './Features/BlogOverviewCard';
import { LatestPostsCard } from './Features/LatestPostsCard';

export const SingleBlog = () => {
  const match: any = useRouteMatch();
  const { blog_id } = match.params;

  const [blog, setBlog] = React.useState(null);

  React.useEffect(() => {
    blogsService.getBlog(blog_id).then(setBlog);
  }, []);

  if (!blog) return null;
  return (
    <div className="grid grid-cols-12 gap-4 p-5 ml-10">
      <div className="row-start-1 shadow-lg bg-white p-4 rounded-lg row-span-3 col-start-1 col-span-6">
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <img src="/coming-soon.png" />
          </div>
          <div className="col-span-6 ml-4 my-1">
            <h2 className="text-lg font-bold ">DataAddict's Blog</h2>
            <h2 className="text-lg font-medium text-gray-500 my-2">
              https://www.gjergjk71.bloggrs.com
            </h2>
            <h2 className="text-lg font-medium text-blue-500 my-2">
              Connect Your Own Domain
            </h2>
          </div>
          <div className="col-span-1 col-start-11">
            <Link to={`/blogs/${blog_id}/edit`}>
              <button className="w-28 rounded-lg h-12 bg-orange-300 text-white font-medium">
                Edit Site
              </button>
            </Link>
          </div>
        </div>
        <hr />
        <hr />
        <div className="grid grid-cols-12 py-2">
          <div className="col-span-3 text-center">
            <div style={{ display: '-webkit-inline-box' }}>
              <div>
                <h6 className="text-lg font-medium text-gray-800">
                  Site Role: Owner
                </h6>
                <h6 className="text-lg font-medium text-blue-500">
                  Invite people
                </h6>
              </div>
              <div
                style={{
                  marginLeft: 9,
                  borderLeft: '3px solid #2e404d40',
                  height: '60px',
                }}
              ></div>
            </div>
          </div>
          <div className="col-span-3 text-center">
            <div style={{ display: '-webkit-inline-box' }}>
              <div>
                <h6 className="text-lg font-medium text-gray-800">
                  Site Plan: Free
                </h6>
                <h6 className="text-lg font-medium text-blue-500">
                  Change Plan
                </h6>
              </div>
              <div
                style={{
                  marginLeft: 9,
                  borderLeft: '3px solid #2e404d40',
                  height: '60px',
                }}
              ></div>
            </div>
          </div>
          <div className="col-span-3 text-center">
            <div style={{ display: '-webkit-inline-box' }}>
              <div>
                <h6 className="text-lg font-medium text-gray-800">
                  Site Theme: Default
                </h6>
                <h6 className="text-lg font-medium text-blue-500">
                  Change Theme
                </h6>
              </div>
              <div
                style={{
                  marginLeft: 9,
                  borderLeft: '3px solid #2e404d40',
                  height: '60px',
                }}
              ></div>
            </div>
          </div>
          <div className="col-span-3 text-center ">
            <h6 className="text-lg font-medium text-gray-800">
              Status: Published
            </h6>
          </div>
        </div>
      </div>
      <div className="row-start-4 col-start-1 shadow-lg bg-gray-200 text-gray-500  rounded-lg row-span-5  col-span-6">
        <div className="grid grid-cols-12 p-10">
          <div className="col-span-4" style={{ display: '-webkit-inline-box' }}>
            <h2 className="text-lg">Posts</h2>
            <span className="ml-12 text-lg font-medium text-blue-300">
              Published (3)
            </span>
          </div>
          <div className="col-span-1 col-start-11">
            <button className="w-28 rounded-lg h-10 bg-orange-300 text-white font-medium">
              New Post
            </button>
          </div>
          <div className="my-5 shadow-lg bg-white p-4 rounded-lg row-start-4 row-span-6 col-span-12">
            <div className="grid grid-cols-12">
              <div className="col-span-4 py-5">
                <img src="/coming-soon.png" />
              </div>
              <div className="col-span-8 ml-4 my-1">
                <h2 className="text-lg font-bold ">
                  15 bloggers share their advice for successful blogging
                </h2>
                <h2 className="text-lg font-medium text-gray-500 my-2">
                  To create and manage your own content, open the Blog Manager
                  by hovering over your blog feed and clicking Mana....
                </h2>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-12">
              <div className="col-span-4 py-5">
                <img src="/coming-soon.png" />
              </div>
              <div className="col-span-8 ml-4 my-1">
                <h2 className="text-lg font-bold ">
                  15 bloggers share their advice for successful blogging
                </h2>
                <h2 className="text-lg font-medium text-gray-500 my-2">
                  To create and manage your own content, open the Blog Manager
                  by hovering over your blog feed and clicking Mana....
                </h2>
              </div>
            </div>
            <hr />
            <div className="grid grid-cols-12">
              <div className="col-span-4 py-5">
                <img src="/coming-soon.png" />
              </div>
              <div className="col-span-8 ml-4 my-1">
                <h2 className="text-lg font-bold ">
                  15 bloggers share their advice for successful blogging
                </h2>
                <h2 className="text-lg font-medium text-gray-500 my-2">
                  To create and manage your own content, open the Blog Manager
                  by hovering over your blog feed and clicking Mana....
                </h2>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: 'E5EBF1' }}
        className="row-start-1 shadow-md p-4 rounded-lg row-span-6 col-start-8 col-span-4"
      >
        <div className="shadow-md bg-white p-4 rounded-lg grid grid-cols-12">
          <div className="col-span-6">
            <h1 className="font-medium text-2xl text-slate-700">Analytics</h1>
          </div>
          <div className="col-span-6">
            <h1 className="font-medium text-xl text-blue-500 text-right">
              See all reports
            </h1>
          </div>
          <div className="col-span-12">
            <span className="font-medium text-lg text-gray-500 text-right">
              All time
            </span>
          </div>
          <div className="col-span-6 my-5">
            <span className="font-medium text-lg text-gray-500 text-right">
              Site sessions
            </span>
            <br />
            <span className="font-medium text-lg text-gray-500 text-right">
              0
            </span>
          </div>
          <div className="col-span-3 col-start-9 col">
            <div style={{ marginTop: 34 }}>
              <hr style={{ border: '1px solid #93ceff' }} />
              <hr style={{ border: '1px solid #93ceff' }} />
            </div>
          </div>
          <div className="col-span-6 my-5">
            <span className="font-medium text-lg text-gray-500 text-right">
              Page Views(Daily)
            </span>
            <br />
            <span className="font-medium text-lg text-gray-500 text-right">
              0
            </span>
          </div>
          <div className="col-span-3 col-start-9 col">
            <div style={{ marginTop: 34 }}>
              <hr style={{ border: '1px solid #93ceff' }} />
              <hr style={{ border: '1px solid #93ceff' }} />
            </div>
          </div>
        </div>
        <div className="my-5 shadow-md bg-white p-4 rounded-lg">
          <h1 className="font-medium text-2xl text-slate-700">
            We're here for you
          </h1>
          <h1 className="font-medium text-xl text-gray-500">
            Get the help you need every step of the way.
          </h1>

          <div className="flex flex-inline ml-5 my-5">
            <img src="/dist/static/icons8-search-48.png" className="py-2" />
            <input
              className="mx-5 bg-transparent w-full outline-none text-slate-900"
              placeholder="Search for your business or blog type"
            />
          </div>
          <h1
            style={{ fontSize: '1.5em ' }}
            className="text-blue-500 cursor-pointer"
          >
            Visit Help Center
          </h1>
          <h1
            style={{ fontSize: '1.5em ' }}
            className="text-blue-500 cursor-pointer"
          >
            Hire a Professional
          </h1>
        </div>
      </div>

      {/* SingleBlog
      <br />
      <hr />
      <BlogOverviewCard />
      <br />
      <hr />
      <LatestPostsCard /> */}
    </div>
  );
};
