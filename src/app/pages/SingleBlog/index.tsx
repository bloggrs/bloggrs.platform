import * as React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { blogsService } from 'services/blogs.service';
import { LatestPostsCard } from './Features/LatestPostsCard';
import slugify from 'slugify';
import {
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  RssIcon,
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
} from '@heroicons/react/24/outline';

export const SingleBlog = () => {
  const match: any = useRouteMatch();
  const history = useHistory();
  const { blog_id } = match.params;
  const [blog, setBlog]: any = React.useState(null);
  const [error, setError]: any = React.useState(null);
  const [isLoading, setIsLoading]: any = React.useState(true);
  const [stats, setStats] = React.useState({
    views: '12.5K',
    subscribers: '842',
    posts: '24',
    engagement: '8.2%',
  });

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

  if (isLoading) return <div>Loading...</div>;
  if (error === 'not_found') return <div>Blog not found</div>;
  if (error === 'other') return <div>Error loading blog</div>;
  if (!blog) return <div>No blog data available</div>;

  const quickActions = [
    { name: 'Write New Post', href: `/blogs/${blog.id}/posts/create` },
    { name: 'Customize Theme', href: `/blogs/${blog.id}/customize` },
    { name: 'Manage Team', href: `/blogs/${blog.id}/team-members` },
    { name: 'View Analytics', href: `/blogs/${blog.id}/analytics` },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ marginTop: '3%' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Quick Actions</h3>
            <div className="flex space-x-4">
              {quickActions.map(action => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="text-sm text-[#1a365d] hover:text-[#2d4ed8] transition-colors"
                >
                  {action.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 space-y-6">
            {/* Blog Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    src={blog.logo || 'http://localhost:3000/coming-soon.png'}
                    alt="Blog thumbnail"
                  />
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {blog.name}
                      </h2>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      https://www.{slugify(blog.name).toLowerCase()}.bloggrs.com
                      <button className="ml-2 text-[#1a365d] hover:text-[#2d4ed8] transition-colors">
                        <ExternalLinkIcon className="w-4 h-4 inline" />
                      </button>
                    </p>
                    <div className="flex space-x-4">
                      <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                        Connect Custom Domain →
                      </button>
                      <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                        SEO Settings →
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link to={`/blogs/${blog.id}/edit`}>
                      <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors shadow-sm">
                        Edit Site
                      </button>
                    </Link>
                    <Link to={`/blogs/${blog.id}/preview`}>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                        Preview
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  <div className="p-6 space-y-1">
                    <h6 className="text-sm font-medium text-gray-500">
                      Site Role
                    </h6>
                    <p className="text-gray-900">Owner</p>
                    <Link to={`/blogs/${blog.id}/team/invite`}>
                      <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                        Invite people →
                      </button>
                    </Link>
                  </div>
                  <div className="p-6 space-y-1">
                    <h6 className="text-sm font-medium text-gray-500">
                      Monthly Views
                    </h6>
                    <p className="text-gray-900">{stats.views}</p>
                    <p className="text-green-600 text-sm">
                      ↑ 12% from last month
                    </p>
                  </div>
                  <div className="p-6 space-y-1">
                    <h6 className="text-sm font-medium text-gray-500">
                      Subscribers
                    </h6>
                    <p className="text-gray-900">{stats.subscribers}</p>
                    <Link to={`/blogs/${blog.id}/subscribers`}>
                      <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                        Manage list →
                      </button>
                    </Link>
                  </div>
                  <div className="p-6 space-y-1">
                    <h6 className="text-sm font-medium text-gray-500">
                      Engagement Rate
                    </h6>
                    <p className="text-gray-900">{stats.engagement}</p>
                    <Link to={`/blogs/${blog.id}/analytics`}>
                      <button className="text-[#1a365d] text-sm font-medium hover:text-[#2d4ed8] transition-colors">
                        View analytics →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Posts
                    </h2>
                    <div className="flex space-x-2">
                      <span className="px-2.5 py-0.5 bg-[#1a365d]/10 text-[#1a365d] rounded-full text-sm font-medium">
                        Published ({stats.posts})
                      </span>
                      <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Draft (2)
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link to={`/blogs/${blog.id}/posts`}>
                      <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        View All
                      </button>
                    </Link>
                    <Link to={`/blogs/${blog.id}/posts/create`}>
                      <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4ed8] transition-colors shadow-sm">
                        New Post
                      </button>
                    </Link>
                  </div>
                </div>
                <LatestPostsCard />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Analytics Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Today's Views</span>
                  <span className="text-sm font-medium text-gray-900">
                    1,247
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Avg. Time on Site
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    2m 35s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Bounce Rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    42.3%
                  </span>
                </div>
                <Link to={`/blogs/${blog.id}/analytics`}>
                  <button className="w-full mt-2 text-sm text-[#1a365d] hover:text-[#2d4ed8] transition-colors">
                    View detailed analytics →
                  </button>
                </Link>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-sm text-gray-600 hover:text-[#1a365d]"
                >
                  • How to customize your blog theme
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 hover:text-[#1a365d]"
                >
                  • Setting up your custom domain
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 hover:text-[#1a365d]"
                >
                  • Best practices for SEO
                </a>
                <Link to="/support">
                  <button className="w-full mt-2 text-sm text-[#1a365d] hover:text-[#2d4ed8] transition-colors">
                    Visit Help Center →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
