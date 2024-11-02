
import { useBlogsSlice } from 'app/pages/HomePage/slice';
import {
  getBlogsForQuery,
  getLoadingForQuery,
} from 'app/pages/HomePage/slice/selectors';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter, matchPath, RouteComponentProps } from 'react-router-dom';
import { CenteredImage } from '../CenteredImage';
import { Loading } from '../Loading';

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

const getPathname = (blogId: string, path: string): string => `/blogs/${blogId}${path}`;

const SelectBlogContainer: React.FC<{ loading: boolean; children: React.ReactNode }> = ({ 
  children, 
  loading 
}) => (
  <div className="">
    {loading ? <Loading forModal={true} /> : children}
  </div>
);

const SelectBlog: React.FC<SelectBlogProps> = ({ loading, selected, blogs }) => {
  const BlogItems = blogs.map((blog) => (
    <div
      key={blog.id}
      onClick={() => { window.location.pathname = `/blogs/${blog.id}`; }}
      className="flex items-center p-3 hover:bg-slate-600 transition-colors"
      data-selected={String(selected === blog.id)}
    >
      <img 
        className="w-8 h-8 rounded-full mr-3" 
        src={blog.avatar || '/default-blog-avatar.png'} 
        alt={`${blog.name} avatar`}
      />
      <span className="text-white">{blog.name}</span>
    </div>
  ));

  return (
    <div className="absolute bottom-24 left-0 w-64 bg-slate-700 rounded-lg shadow-lg overflow-hidden">
      <SelectBlogContainer loading={loading}>{BlogItems}</SelectBlogContainer>
    </div>
  );
};

interface SidebarProps extends RouteComponentProps {
  collapse?: boolean;
  style?: React.CSSProperties;
}

export const _Sidebar: React.FC<SidebarProps> = ({ collapse, style = {}, location }) => {
  const match = matchPath<{ blog_id: string }>(location?.pathname, {
    path: '/blogs/:blog_id',
  });

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
      <div className="absolute h-screen max-h-screen max-w-10 w-5 py-5 bg-slate-700" />
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
        className="w-20 md:w-24 bg-[#1e3a8a] transition-all duration-200"
      />
      <div
        style={{
          position: 'fixed',
          top: 104,
          zIndex: 20,
          ...style,
        }}
        className="flex flex-col items-center w-20 md:w-24 bg-[#1e3a8a] transition-all duration-200"
      >
        <Link to={getPathname(blogId, '/')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-dashboard-80.png"
            alt="Dashboard"
          />
        </Link>
        <Link to={getPathname(blogId, '/posts')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-page-80.png"
            alt="Posts"
          />
        </Link>
        <Link to={getPathname(blogId, '/categories')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-category-40.png"
            alt="Posts"
          />
        </Link>
        <Link to={getPathname(blogId, '/comments')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-chat-bubble-80.png"
            alt="Comments"
          />
        </Link>
        <Link to={getPathname(blogId, '/team-members')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-team-80.png"
            alt="Team Members"
          />
        </Link>
        <Link to={getPathname(blogId, '/settings')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-settings-80.png"
            alt="Settings"
          />
        </Link>
        <div
          className="fixed bottom-0 w-20 md:w-24 h-24 bg-[#164666] cursor-pointer"
          onClick={toggleSelectBlog}
        >
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 mx-auto mt-4 rounded-full bg-slate-700">
            <span className="text-white font-medium">GK</span>
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
