/* eslint-disable */
import React from 'react';
import FeatherIcon from 'feather-icons-react';
import Item from './Item';
import { useLocation, useNavigate, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { SelectBlog } from '../SelectBlog';
import { PrivateRoute } from '../PrivateRoute';

const Sidebar = props => {
  const location = useLocation();
  const history = useHistory();
  const navigate = history.push;

  const { pathname } = location;

  const minimal = pathname === '/blogs/create';

  const onBlogChange = e => {
    const { value } = e.target;
    const redirect = value === 'create';
    if (redirect) return navigate('/blogs/create');
  };

  const path_of_authentication =
    pathname.indexOf('login') !== -1 || pathname.indexOf('register') !== -1;
  if (path_of_authentication) return props.children || null;
  if (!props.opened) return <></>;
  if (minimal) {
    return (
      <div className="left-sidenav" style={{ minWidth: 85 }}>
        <div className="brand">
          <Link to="/" className="logo">
            <span>
              <img
                src="/dist/static/image1.png"
                alt="logo-small"
                className="logo-md"
              />
            </span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="left-sidenav">
      <div className="brand">
        <Link to="/" className="logo">
          <span>
            <img
              src="/dist/static/image1.png"
              alt="logo-small"
              className="logo-md"
            />
          </span>
          <span>
            <img
              src="/dist/static/image1.png"
              alt="logo-large"
              className="logo-lg logo-light"
            />
            {/* <img
                src="/dist/static/image1.png"
                alt="logo-large"
                className="logo-lg logo-dark"
                /> */}
          </span>
        </Link>
      </div>
      <div className="menu-content h-100" data-simplebar="init">
        <div className="simplebar-wrapper" style={{ margin: '0px 0px -70px' }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer" />
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"
                style={{ height: '100%', overflow: 'hidden scroll' }}
              >
                <PrivateRoute>
                  <SelectBlog />
                </PrivateRoute>
                <div
                  className="simplebar-content"
                  style={{ padding: '0px 0px 70px' }}
                >
                  <ul className="metismenu left-sidenav-menu">
                    <li className="menu-label mt-0">Main</li>
                    <Item
                      label={'Dashboard'}
                      to="/"
                      icon="home"
                      className="feather feather-home align-self-center menu-icon"
                    />
                    <Item label={'Posts'} to="/posts" icon="list" />
                    <Item
                      label={'Categories'}
                      to="/categories"
                      icon="align-right"
                    />
                    <Item label={'Tags'} to="/tags" icon="align-right" />
                    <Item
                      label={'Comments'}
                      to="/comments"
                      icon="message-square"
                    />
                    <Item label={'Teams'} to="/teams" icon="user" />
                    <Item
                      label={'Settings'}
                      icon="settings"
                      to="/settings"
                      items={[
                        {
                          label: 'General',
                          to: '/settings/general',
                        },
                        {
                          label: 'Blog Category',
                          to: '/settings/category',
                        },
                        {
                          label: 'URL',
                          to: '/settings/url',
                        },
                        {
                          label: 'Theme',
                          to: '/settings/theme',
                        },
                      ]}
                    />
                  </ul>
                  <div className="update-msg text-center">
                    <a
                      href="javascript: void(0);"
                      className="float-end close-btn text-muted"
                      data-dismiss="update-msg"
                      aria-label="Close"
                      aria-hidden="true"
                    >
                      <i className="mdi mdi-close" />
                    </a>
                    <h5 className="mt-3">Mannat Themes</h5>
                    <p className="mb-3">
                      We Design and Develop Clean and High Quality Web
                      Applications
                    </p>
                    <a
                      href="javascript: void(0);"
                      className="btn btn-outline-warning btn-sm"
                    >
                      Upgrade your plan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            style={{ width: 'auto', height: 4335 }}
          />
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          style={{ visibility: 'hidden' }}
        >
          <div
            className="simplebar-scrollbar"
            style={{ width: 0, display: 'none' }}
          />
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          style={{ visibility: 'visible' }}
        >
          <div
            className="simplebar-scrollbar"
            style={{
              height: 316,
              display: 'block',
              transform: 'translate3d(0px, 0px, 0px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
