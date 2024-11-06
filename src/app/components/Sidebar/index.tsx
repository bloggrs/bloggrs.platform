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

const SelectBlog: React.FC<SelectBlogProps> = ({ loading, selected, blogs }) => {
  const BlogItems = blogs.map(blog => (
    <div
      key={blog.id}
      onClick={() => {
        window.location.pathname = `/blogs/${blog.id}`;
      }}
      className="flex items-center p-3 hover:bg-gray-100/10 transition-colors"
      data-selected={String(selected === blog.id)}
    >
      <img
        className="w-8 h-8 rounded-full mr-3"
        src={blog.avatar || '/default-blog-avatar.png'}
        alt={`${blog.name} avatar`}
      />
      <span className="text-gray-200">{blog.name}</span>
    </div>
  ));

  return (
    <div className="absolute bottom-24 left-0 w-64 bg-gray-800/95 rounded-lg shadow-xl overflow-hidden border border-gray-700">
      <SelectBlogContainer loading={loading}>{BlogItems}</SelectBlogContainer>
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

  if (collapse) {
    return (
      <div className="absolute h-screen max-h-screen max-w-10 w-5 py-5 bg-[#1a365d]" />
    );
  }

  if (!blogId) return null;

  const iconClass = "w-6 h-6 text-gray-300 hover:text-white transition-colors";

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
        className="w-16 bg-[#1a365d] transition-all duration-200"
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
        <Link to={getPathname(blogId, '/')}>
          <RiHomeLine className={iconClass} />
        </Link>
        <Link to={getPathname(blogId, '/posts')}>
          <RiArticleLine className={iconClass} />
        </Link>
        <Link to={getPathname(blogId, '/categories')}>
          <RiFolderLine className={iconClass} />
        </Link>
        <Link to={getPathname(blogId, '/comments')}>
          <RiMessage2Line className={iconClass} />
        </Link>
        <Link to={getPathname(blogId, '/team-members')}>
          <RiTeamLine className={iconClass} />
        </Link>
        <Link to={getPathname(blogId, '/settings')}>
          <RiSettings3Line className={iconClass} />
        </Link>
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
