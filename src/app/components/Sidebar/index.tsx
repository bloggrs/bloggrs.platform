// @ts-nocheck
import { useBlogsSlice } from 'app/pages/HomePage/slice';
import {
  getBlogsForQuery,
  getLoadingForQuery,
} from 'app/pages/HomePage/slice/selectors';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  withRouter,
  matchPath,
  RouteComponentProps,
} from 'react-router-dom';
import { CenteredImage } from '../CenteredImage';
import { Loading } from '../Loading';
import {
  RiHomeLine,
  RiArticleLine,
  RiFolderLine,
  RiMessage2Line,
  RiTeamLine,
  RiSettings3Line,
  RiTerminalBoxLine,
} from 'react-icons/ri';

interface Blog {
  id: string;
  name: string;
  avatar?: string;
}

interface SelectBlogProps {
  loading: boolean;
  selected: string;
  blogs: Blog[];
}

const getPathname = (blogId: string, path: string): string =>
  `/blogs/${blogId}${path}`;

const SelectBlogContainer: React.FC<{
  loading: boolean;
  children: React.ReactNode;
}> = ({ children, loading }) => (
  <div className="">{loading ? <Loading forModal={true} /> : children}</div>
);

const SelectBlog: React.FC<SelectBlogProps> = ({
  loading,
  selected,
  blogs,
}) => {
  return (
    <div className="absolute bottom-24 left-0 w-64 bg-gray-800/95 rounded-lg shadow-xl overflow-hidden border border-gray-700">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-white font-medium">Switch Blog</h3>
      </div>
      <SelectBlogContainer loading={loading}>
        {blogs.map(blog => (
          <div
            key={blog.id}
            onClick={() => {
              window.location.pathname = `/blogs/${blog.id}`;
            }}
            className={`
              flex items-center p-3 hover:bg-gray-100/10 transition-colors cursor-pointer
              ${selected === blog.id ? 'bg-gray-100/5' : ''}
            `}
          >
            <img
              className="w-8 h-8 rounded-full mr-3"
              src={blog.avatar || '/default-blog-avatar.png'}
              alt={`${blog.name} avatar`}
            />
            <div>
              <div className="text-gray-200">{blog.name}</div>
              {selected === blog.id && (
                <div className="text-xs text-gray-400">Current blog</div>
              )}
            </div>
          </div>
        ))}
      </SelectBlogContainer>
    </div>
  );
};

interface SidebarProps extends RouteComponentProps {
  collapse?: boolean;
  style?: React.CSSProperties;
}
// @ts-nocheck
export const _Sidebar: React.FC<SidebarProps> = ({
  collapse,
  style = {},
  location,
}) => {
  // @ts-nocheck
  const match = matchPath(location?.pathname, {
    path: '/blogs/:blog_id',
  });
  // @ts-nocheck
  const blogId = match?.params?.blog_id;
  const { actions } = useBlogsSlice();
  const blogs = useSelector(getBlogsForQuery(undefined));
  const loading = useSelector(getLoadingForQuery(undefined));

  const [showSelectBlog, setShowSelectBlog] = useState(false);

  const toggleSelectBlog = (e: React.MouseEvent): void => {
    e.preventDefault();
    setShowSelectBlog(!showSelectBlog);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadBlogs({ query: undefined }));
  }, [dispatch, actions]);

  const isActivePath = (path: string) => {
    return location.pathname === getPathname(blogId, path);
  };

  const iconClass = (path: string) => `
    w-6 h-6 text-gray-300 transition-colors
    ${isActivePath(path) ? 'text-white' : 'hover:text-white'}
  `;

  const IconLink: React.FC<{
    to: string;
    icon: React.ReactNode;
    label: string;
  }> = ({ to, icon, label }) => (
    <Link to={to} className="relative group">
      {icon}
      <div className="absolute left-16 top-0 hidden group-hover:block bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
        {label}
      </div>
    </Link>
  );

  const NotificationBadge: React.FC<{ count: number }> = ({ count }) =>
    count > 0 ? (
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {count > 9 ? '9+' : count}
      </div>
    ) : null;

  if (collapse) {
    return (
      <div className="absolute h-screen max-h-screen max-w-10 w-5 py-5 bg-[#1a365d]" />
    );
  }

  if (!blogId) return null;

  return (
    <React.Fragment>
      <div
        style={{
          ...style,
          position: 'fixed',
          top: 0,
          zIndex: 10,
          height: '100%',
        }}
        className={`
          fixed top-0 z-10 h-full bg-[#1a365d] transition-all duration-300
          ${collapse ? 'w-5' : 'w-16'}
        `}
      />
      <div
        style={{
          position: 'fixed',
          top: 104,
          zIndex: 20,
          ...style,
        }}
        className="flex flex-col items-center space-y-6 w-16 bg-[#1a365d] transition-all duration-200"
      >
        <IconLink
          to={getPathname(blogId, '/')}
          icon={<RiHomeLine className={iconClass('/')} />}
          label="Dashboard"
        />
        <IconLink
          to={getPathname(blogId, '/posts')}
          icon={<RiArticleLine className={iconClass('/posts')} />}
          label="Posts"
        />
        <IconLink
          to={getPathname(blogId, '/categories')}
          icon={<RiFolderLine className={iconClass('/categories')} />}
          label="Categories"
        />
        <IconLink
          to={getPathname(blogId, '/comments')}
          icon={
            <div className="relative">
              <RiMessage2Line className={iconClass('/comments')} />
              <NotificationBadge count={5} />
            </div>
          }
          label="Comments"
        />
        <IconLink
          to={getPathname(blogId, '/team-members')}
          icon={<RiTeamLine className={iconClass('/team-members')} />}
          label="Team Members"
        />
        <IconLink
          to={getPathname(blogId, '/console')}
          icon={<RiTerminalBoxLine className={iconClass('/console')} />}
          label="Console"
        />
        <IconLink
          to={getPathname(blogId, '/settings')}
          icon={<RiSettings3Line className={iconClass('/settings')} />}
          label="Settings"
        />
        <div
          className="fixed bottom-0 w-16 h-24 bg-[#15304d] cursor-pointer hover:bg-[#1a365d] transition-colors"
          onClick={toggleSelectBlog}
        >
          <div className="flex items-center justify-center w-10 h-10 mx-auto mt-4 rounded-full bg-gray-700/50">
            <span className="text-gray-300 font-medium">GK</span>
          </div>
          {showSelectBlog && (
            <SelectBlog selected={blogId} loading={loading} blogs={blogs} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export const Sidebar = withRouter(_Sidebar);
