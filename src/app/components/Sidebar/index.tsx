import { useBlogsSlice } from 'app/pages/HomePage/slice';
import {
  getBlogsForQuery,
  getLoadingForQuery,
} from 'app/pages/HomePage/slice/selectors';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter, matchPath, useHistory } from 'react-router-dom';
import { CenteredImage } from '../CenteredImage';
import { Loading } from '../Loading';

const getPathname = (blog_id, path) => `/blogs/${blog_id}${path}`;

const SelectBlogContainer = ({ children, loading }) => {
  return (
    <div
      className="select-blog-container"
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        width: '20vw',
        minHeight: '10vh',
        /* top: 'revert', */ top: '-6vh',
        left: '4vw',
      }}
    >
      {loading ? <Loading forModal={true} /> : children}
    </div>
  );
};
const SelectBlog = ({ loading, selected, blogs }) => {
  const BlogItems = blogs.map((blog, i) => (
    <div
      style={{
        textAlign: 'left',
        font: 'normal normal normal 18px/27px Poppins',
        letterSpacing: 0,
        color: selected == blog.id ? '#bc7c2d' : '#F7941D',
        opacity: 1,
        marginTop: '1vh',
        marginLeft: '1vw',
        cursor: 'pointer',
      }}
      onClick={e => (window.location.pathname = '/blogs/' + blog.id)}
    >
      {blog.name}
      {/* {i !== blogs.length - 1 ? <hr /> : undefined} */}
    </div>
  ));
  return (
    <>
      <SelectBlogContainer loading={loading}>{BlogItems}</SelectBlogContainer>
    </>
  );
};
export const _Sidebar = ({ collapse, style, ...rest }: any) => {
  const match: any = matchPath(window.location.pathname, {
    path: '/blogs/:blog_id',
  });

  const { blog_id }: any = !match ? {} : match.params;
  const { actions } = useBlogsSlice();
  const blogs = useSelector(getBlogsForQuery(undefined));
  const loading = useSelector(getLoadingForQuery(undefined));

  const [showSelectBlog, setShowSelectBlog] = useState(false);

  const toggleSelectBlog = e => {
    e.preventDefault();
    setShowSelectBlog(!showSelectBlog);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadBlogs({ query: undefined }));
  }, []);

  if (collapse) {
    return (
      <div className="absolute h-screen max-h-screen max-w-10 w-5 py-5 bg-slate-700" />
    );
  }

  return (
    <React.Fragment>
      <div
        style={{
          ...style,
          position: 'fixed',
          top: 0,
          zIndex: -1,
          height: '100%',
        }}
        className={'max-w-52 w-24 py-5 bg-slate-700 center'}
      />
      <div
        style={{
          position: 'fixed',
          top: 104,
          zIndex: 100,
          ...style,
        }}
        className={
          'h-screen max-h-screen max-w-52 w-24 py-5 bg-slate-700 center-items'
        }
      >
        <Link to={getPathname(blog_id, '/')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-dashboard-80.png"
          />
        </Link>
        <Link to={getPathname(blog_id, '/posts')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-page-80.png"
          />
        </Link>
        <Link to={getPathname(blog_id, '/comments')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-chat-bubble-80.png"
          />
        </Link>
        <Link to={getPathname(blog_id, '/team-members')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-team-80.png"
          />
        </Link>
        <Link to={getPathname(blog_id, '/settings')}>
          <CenteredImage
            className="py-3 cursor-pointer"
            src="/dist/static/sidebar/icons8-settings-80.png"
          />
        </Link>
        <div
          style={{
            background: '#164666 0% 0% no-repeat padding-box;',
          }}
          className="fixed bottom-0 bg-white h-24 py-5 w-24 bg-slate-900"
          onClick={toggleSelectBlog}
        >
          <div className="cursor-pointer align-middle w-14 h-14 m-auto py-4 mx-5 rounded-full bg-slate-700 text-center ">
            <span className="py-4 font-medium text-white">GK</span>
          </div>
          {showSelectBlog ? (
            <SelectBlog selected={blog_id} loading={loading} blogs={blogs} />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export const Sidebar = withRouter(_Sidebar);
