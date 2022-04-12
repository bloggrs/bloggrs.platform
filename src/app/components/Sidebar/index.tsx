import * as React from 'react';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { CenteredImage } from '../CenteredImage';

const getPathname = (blog_id, path) => `/blogs/${blog_id}${path}`;

export const _Sidebar = ({ collapse, style, ...rest }: any) => {
  const match: any = matchPath(window.location.pathname, {
    path: '/blogs/:blog_id',
  });

  const { blog_id }: any = !match ? {} : match.params;

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
          height: "100%",
        }}
        className={
          'max-w-52 w-24 py-5 bg-slate-700 center'
        }
      />
      <div
        style={{
          position: 'fixed',
          top: 104,
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
        >
          <div className="cursor-pointer align-middle w-14 h-14 m-auto py-4 mx-5 rounded-full bg-slate-700 text-center ">
            <span className="py-4 font-medium text-white">GK</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const Sidebar = withRouter(_Sidebar);
