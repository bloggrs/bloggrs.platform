import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';
import { BlogOverviewCard } from './Features/BlogOverviewCard';
import { LatestPostsCard } from './Features/LatestPostsCard';
import slugify from 'slugify';
import { NotAuthorized } from 'app/components/NotAuthorized';

export const SingleBlog = () => {
  const match: any = useRouteMatch();
  const { blog_id } = match.params;
  const [blog, setBlog]: any = React.useState(null);
  const [error, setError]: any = React.useState(null);
  const [isLoading, setIsLoading]: any = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    setIsLoading(true);
    blogsService
      .getBlog(blog_id)
      .then(response => {
        console.log('Blog response:', response);
        if (response) {
          setBlog(response);
          setError(null);
        } else {
          setError('not_found');
        }
      })
      .catch(err => {
        console.error('Blog error:', err);
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          setError('unauthorized');
        } else {
          setError('other');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [blog_id]);

  // Loading state
  if (isLoading) return <div>Loading...</div>;
  // Error states
  // if (error === 'unauthorized') return <NotAuthorized />;
  if (error === 'not_found') return <div>Blog not found</div>;
  if (error === 'other') return <div>Error loading blog</div>;

  // No blog data
  if (!blog) return <div>No blog data available</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Blog Overview Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <img
                className="w-20 h-20 object-cover rounded"
                src="http://localhost:3000/coming-soon.png"
                alt="Blog thumbnail"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-900">
                  {blog.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  https://www.{slugify(blog.name).toLowerCase()}.bloggrs.com
                </p>
                <button className="text-blue-600 text-sm font-medium mt-1">
                  Connect Your Own Domain
                </button>
              </div>
              <Link to={`/blogs/${blog.id}/edit`}>
                <button className="px-4 py-2 bg-[#FFB84C] text-white rounded-lg hover:bg-[#FFA726] transition-colors">
                  Edit Site
                </button>
              </Link>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Site Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h6 className="text-sm font-medium text-gray-600">Site Role</h6>
                <p className="text-gray-900 font-medium">Owner</p>
                <button className="text-blue-600 text-sm font-medium mt-1">
                  Invite people
                </button>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-600">Site Plan</h6>
                <p className="text-gray-900 font-medium">Free</p>
                <button className="text-blue-600 text-sm font-medium mt-1">
                  Change Plan
                </button>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-600">
                  Site Theme
                </h6>
                <p className="text-gray-900 font-medium">Default</p>
                <button className="text-blue-600 text-sm font-medium mt-1">
                  Change Theme
                </button>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-600">Status</h6>
                <p className="text-gray-900 font-medium">Published</p>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-medium text-gray-900">Posts</h2>
                <span className="text-blue-600 font-medium">Published (3)</span>
              </div>
              <Link to={`/blogs/${blog.id}/posts/create`}>
                <button className="px-4 py-2 bg-[#FFB84C] text-white rounded-lg hover:bg-[#FFA726] transition-colors">
                  New Post
                </button>
              </Link>
            </div>
            <LatestPostsCard />
            <div className="text-center mt-4">
              <Link to={`/blogs/${blog.id}/posts`}>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  View All
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-1/4 space-y-6">
          {/* Analytics Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* ... existing analytics content ... */}
          </div>

          {/* Help Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* ... existing help content ... */}
          </div>
        </div>
      </div>
    </div>
  );
};
