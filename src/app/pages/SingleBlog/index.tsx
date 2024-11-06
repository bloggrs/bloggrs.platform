import * as React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';
import { LatestPostsCard } from './Features/LatestPostsCard';
import slugify from 'slugify';

export const SingleBlog = () => {
  const match: any = useRouteMatch();
  const { blog_id } = match.params;
  const [blog, setBlog]: any = React.useState(null);
  const [error, setError]: any = React.useState(null);
  const [isLoading, setIsLoading]: any = React.useState(true);

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
    <div className="min-h-screen bg-gray-50" style={{marginTop: "3%"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 space-y-6">
            {/* Blog Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    src="http://localhost:3000/coming-soon.png"
                    alt="Blog thumbnail"
                  />
                  <div className="flex-grow space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {blog.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      https://www.{slugify(blog.name).toLowerCase()}.bloggrs.com
                    </p>
                    <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                      Connect Your Own Domain →
                    </button>
                  </div>
                  <Link to={`/blogs/${blog.id}/customize`}>
                    <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors shadow-sm">
                      Edit Site
                    </button>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {/* Site Stats items */}
                  <div className="p-6 space-y-1">
                    <h6 className="text-sm font-medium text-gray-500">Site Role</h6>
                    <p className="text-gray-900">Owner</p>
                    <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                      Invite people →
                    </button>
                  </div>
                  {/* ... other stat items with similar styling ... */}
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Posts</h2>
                    <span className="px-2.5 py-0.5 bg-[#1a365d]/10 text-[#1a365d] rounded-full text-sm font-medium">
                      Published (3)
                    </span>
                  </div>
                  <Link to={`/blogs/${blog.id}/posts/create`}>
                    <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors shadow-sm">
                      New Post
                    </button>
                  </Link>
                </div>
                <LatestPostsCard />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Analytics Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* ... existing analytics content ... */}
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* ... existing help content ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
