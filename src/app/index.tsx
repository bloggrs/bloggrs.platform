/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { CreateBlog } from './pages/CreateBlog/Loadable';
import { BlogCustomization } from './pages/BlogCustomization/Loadable';
import { PostsListing } from './pages/PostsListing/Loadable';
import { CommentsListing } from './pages/CommentsListing/Loadable';
import { CreatePost } from './pages/CreatePost/Loadable';
import { SingleBlog } from './pages/SingleBlog/Loadable';
import { LogoutPage } from './pages/LogoutPage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { PrivateRoute } from './components/PrivateRoute';
import { useTranslation } from 'react-i18next';
import { useAuthSlice } from '../features/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authUserSelector } from 'features/auth/selectors';
import { MainPanel } from './components/MainPanel';
import { useLocation } from 'react-router-dom';
import { EditBlog } from './pages/EditBlog/Loadable';
import Sidebar from './components/Sidebar';
import { MyProfile } from './pages/MyProfile/Loadable';
import { Categories } from './pages/Categories';
import { CreateCategory } from './pages/CreateCategory';

export function App() {
  const { actions } = useAuthSlice();
  const user = useSelector(authUserSelector);
  const { token } = user || {};
  const dispatch = useDispatch();
  const location = useLocation();

  const [ sideBarOpened, setSideBarOpened ] = React.useState(true);

  console.log(location, 'location');

  (window as any).toast = toast;

  useEffect(() => {
    dispatch(actions.authenticate());
  }, [token]);

  const { i18n } = useTranslation();

  const { pathname } = location;
  const collapse_main_panel = [pathname === '/'].indexOf(true) !== -1;

    useEffect(() => {
    const { body } = document;
    if (!sideBarOpened) return body.classList.add("enlarge-menu");
    return body.classList.remove("enlarge-menu"); 
  }, [ sideBarOpened ]);

  const toggleSideBar = () => setSideBarOpened(!sideBarOpened);
  const newButton = { label: "New post", to: "/posts/create" };
  const isComment = pathname.indexOf("comment") !== -1;
  const isPost = pathname.indexOf("task") !== -1;
  const isTeam = pathname.indexOf("team") !== -1;
  const isCategory = pathname.indexOf("categories") !== -1;
  const isTag = pathname.indexOf("tags") !== -1;
  if (isComment) {
    newButton.label = "New comment"
    newButton.to = "/comments/create"
  } else if (isPost) {
    newButton.label = "New post"
    newButton.to = "/posts/create"
  } else if (isTeam) {
    newButton.label = "New team"
    newButton.to = "/teams/create"
  } else if (isCategory) {
    newButton.label = "New category"
    newButton.to = "/categories/create"
  } else if (isTag) {
    newButton.label = "New tag"
    newButton.to = "/tags/create"
  }
  if (location.hash == "404") return <>E404</>

  return (
    <>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Sidebar opened={sideBarOpened} />
      <Switch>
        {/* Authentication routes */}
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route exact path="/auth/logout" component={LogoutPage} />
        {/* EndAuthentication routes */}
        <PrivateRoute
          exact
          path="/blogs/:blog_id/posts/:id"
          component={CreatePost}
        />
        <MainPanel
          sideBarOpened={sideBarOpened} 
          setSideBarOpened={setSideBarOpened}
          sidebarProps={{ collapse: collapse_main_panel }}
          toggleSideBar={toggleSideBar}
          newButton={newButton}
        >
          <PrivateRoute exact path="/" component={MyProfile} />
          <PrivateRoute exact path="/categories" component={Categories} />
          <PrivateRoute exact path="/categories/create" component={CreateCategory} />
          <PrivateRoute exact path="/blogs/create" component={CreateBlog} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/posts"
            component={PostsListing}
          />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/comments"
            component={CommentsListing}
          />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/customize"
            component={BlogCustomization}
          />
          <PrivateRoute exact path="/blogs/:blog_id" component={SingleBlog} />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/edit"
            component={EditBlog}
          />
        </MainPanel>
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}
