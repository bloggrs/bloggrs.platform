import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import Sidebar from '../Sidebar';

export const MainPanel = ({
  children,
  className,
  sidebarProps,
  id,
  style: style_,
  hideSidebar,
  sideBarOpened,
  ...props
}: any) => {
  const style = sideBarOpened ? { marginLeft: 230 } : { margin: 0 };
  const location = useLocation();
  const { pathname } = location;

  const minimal = pathname.indexOf('/blogs/create') !== -1;
  if (minimal) {
    return (
      <div className="page-wrapper ml-85">
        <div>
          <div className="navbar-custom">
            <h3 className="ml-2" style={{ marginLeft: 25 }}>
              Setup your new blog
            </h3>
          </div>
          {children}
        </div>
      </div>
    );
  }
  const path_of_authentication =
    pathname.indexOf('login') !== -1 || pathname.indexOf('register') !== -1;
  if (path_of_authentication) return children;
  return (
    <div className="page-wrapper" style={style}>
      <div className="topbar">
        <nav className="navbar-custom">
          <ul className="list-unstyled topbar-nav float-end mb-0">
            <li className="dropdown hide-phone">
              <a
                className="nav-link dropdown-toggle arrow-none waves-light waves-effect"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search topbar-icon"
                >
                  <g>
                    <circle cx={11} cy={11} r={8} />
                    <line x1={21} y1={21} x2="16.65" y2="16.65" />
                  </g>
                </svg>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-lg p-0">
                <div className="app-search-topbar">
                  <form action="#" method="get">
                    <input
                      type="search"
                      name="search"
                      className="from-control top-search mb-0"
                      placeholder="Type text..."
                    />
                    <button type="submit">
                      <i className="ti-search" />
                    </button>
                  </form>
                </div>
              </div>
            </li>
            <li className="dropdown notification-list">
              <a
                className="nav-link dropdown-toggle arrow-none waves-light waves-effect"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell align-self-center topbar-icon"
                >
                  <g>
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </g>
                </svg>
                <span className="badge bg-danger rounded-pill noti-icon-badge">
                  2
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-lg pt-0">
                <h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                  Notifications{' '}
                  <span className="badge bg-primary rounded-pill">2</span>
                </h6>
                <div className="notification-menu" data-simplebar="init">
                  <div className="simplebar-wrapper" style={{ margin: 0 }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer" />
                    </div>
                    <div className="simplebar-mask">
                      <div
                        className="simplebar-offset"
                        style={{ right: 0, bottom: 0 }}
                      >
                        <div
                          className="simplebar-content-wrapper"
                          style={{ height: 'auto', overflow: 'hidden' }}
                        >
                          <div
                            className="simplebar-content"
                            style={{ padding: 0 }}
                          >
                            <a href="#" className="dropdown-item py-3">
                              <small className="float-end text-muted ps-2">
                                2 min ago
                              </small>
                              <div className="media">
                                <div className="avatar-md bg-soft-primary">
                                  <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-shopping-cart align-self-center icon-xs"
                                  >
                                    <g>
                                      <circle cx={9} cy={21} r={1} />
                                      <circle cx={20} cy={21} r={1} />
                                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    </g>
                                  </svg>
                                </div>
                                <div className="media-body align-self-center ms-2 text-truncate">
                                  <h6 className="my-0 fw-normal text-dark">
                                    Your order is placed
                                  </h6>
                                  <small className="text-muted mb-0">
                                    Dummy text of the printing and industry.
                                  </small>
                                </div>
                              </div>
                            </a>
                            <a href="#" className="dropdown-item py-3">
                              <small className="float-end text-muted ps-2">
                                10 min ago
                              </small>
                              <div className="media">
                                <div className="avatar-md bg-soft-primary">
                                  <img
                                    src="/assets/images/users/user-4.jpg"
                                    alt=""
                                    className="thumb-sm rounded-circle"
                                  />
                                </div>
                                <div className="media-body align-self-center ms-2 text-truncate">
                                  <h6 className="my-0 fw-normal text-dark">
                                    Meeting with designers
                                  </h6>
                                  <small className="text-muted mb-0">
                                    It is a long established fact that a reader.
                                  </small>
                                </div>
                              </div>
                            </a>
                            <a href="#" className="dropdown-item py-3">
                              <small className="float-end text-muted ps-2">
                                40 min ago
                              </small>
                              <div className="media">
                                <div className="avatar-md bg-soft-primary">
                                  <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-users align-self-center icon-xs"
                                  >
                                    <g>
                                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                      <circle cx={9} cy={7} r={4} />
                                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </g>
                                  </svg>
                                </div>
                                <div className="media-body align-self-center ms-2 text-truncate">
                                  <h6 className="my-0 fw-normal text-dark">
                                    UX 3 Task complete.
                                  </h6>
                                  <small className="text-muted mb-0">
                                    Dummy text of the printing.
                                  </small>
                                </div>
                              </div>
                            </a>
                            <a href="#" className="dropdown-item py-3">
                              <small className="float-end text-muted ps-2">
                                1 hr ago
                              </small>
                              <div className="media">
                                <div className="avatar-md bg-soft-primary">
                                  <img
                                    src="/assets/images/users/user-5.jpg"
                                    alt=""
                                    className="thumb-sm rounded-circle"
                                  />
                                </div>
                                <div className="media-body align-self-center ms-2 text-truncate">
                                  <h6 className="my-0 fw-normal text-dark">
                                    Your order is placed
                                  </h6>
                                  <small className="text-muted mb-0">
                                    It is a long established fact that a reader.
                                  </small>
                                </div>
                              </div>
                            </a>
                            <a href="#" className="dropdown-item py-3">
                              <small className="float-end text-muted ps-2">
                                2 hrs ago
                              </small>
                              <div className="media">
                                <div className="avatar-md bg-soft-primary">
                                  <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-check-circle align-self-center icon-xs"
                                  >
                                    <g>
                                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                      <polyline points="22 4 12 14.01 9 11.01" />
                                    </g>
                                  </svg>
                                </div>
                                <div className="media-body align-self-center ms-2 text-truncate">
                                  <h6 className="my-0 fw-normal text-dark">
                                    Payment Successfull
                                  </h6>
                                  <small className="text-muted mb-0">
                                    Dummy text of the printing.
                                  </small>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="simplebar-placeholder"
                      style={{ width: 0, height: 0 }}
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
                    style={{ visibility: 'hidden' }}
                  >
                    <div
                      className="simplebar-scrollbar"
                      style={{ height: 0, display: 'none' }}
                    />
                  </div>
                </div>
                <a
                  href="javascript:void(0);"
                  className="dropdown-item text-center text-primary"
                >
                  View all <i className="fi-arrow-right" />
                </a>
              </div>
            </li>
            <li className="dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-light nav-user"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <span className="ms-1 nav-user-name hidden-sm">Nick</span>
                <img
                  src="/assets/images/users/user-5.jpg"
                  alt="profile-user"
                  className="rounded-circle thumb-xs"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/me">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user align-self-center icon-xs icon-dual me-1"
                  >
                    <g>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </g>
                  </svg>{' '}
                  Profile
                </Link>
                <a className="dropdown-item" href="apps-contact-list.html">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-users align-self-center icon-xs icon-dual me-1"
                  >
                    <g>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </g>
                  </svg>{' '}
                  Contacts
                </a>
                <div className="dropdown-divider mb-0" />
                <a className="dropdown-item" href="/auth/logout">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-power align-self-center icon-xs icon-dual me-1"
                  >
                    <g>
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                      <line x1={12} y1={2} x2={12} y2={12} />
                    </g>
                  </svg>{' '}
                  Logout
                </a>
              </div>
            </li>
          </ul>
          <ul className="list-unstyled topbar-nav mb-0">
            <li onClick={props.toggleSideBar}>
              <button className="nav-link button-menu-mobile">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu align-self-center topbar-icon"
                >
                  <g>
                    <line x1={3} y1={12} x2={21} y2={12} />
                    <line x1={3} y1={6} x2={21} y2={6} />
                    <line x1={3} y1={18} x2={21} y2={18} />
                  </g>
                </svg>
              </button>
            </li>
            <li className="creat-btn">
              <div
                className="nav-link"
                style={{
                  display: Boolean(props.newButton) ? 'block' : 'hidden',
                }}
              >
                <Link
                  className=" btn btn-sm btn-soft-primary"
                  to={props.newButton?.to || '#'}
                  role="button"
                >
                  <i className="fas fa-plus me-2" />
                  {props.newButton?.label}
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="page-content">
        {children}
        <footer className="footer text-center text-sm-start">
          © Bloggrs{' '}
          <span className="text-muted d-none d-sm-inline-block float-end">
            Crafted with <i className="mdi mdi-heart text-danger" /> by Bloggrs
          </span>
        </footer>
      </div>
    </div>
  );
};
