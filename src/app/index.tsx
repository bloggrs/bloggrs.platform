// @ts-nocheck
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
import { SettingsPage } from './pages/SettingsPage/Loadable';
import { TransferPage } from './pages/TransferPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { CategoriesListing } from './pages/CategoriesListing';
import { CreateCategory } from './pages/CreateCategory';

export function App() {
  const { actions } = useAuthSlice();
  const user = useSelector(authUserSelector);
  const { token } = user || {};
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location, 'location');

  (window as any).toast = toast;

  useEffect(() => {
    dispatch(actions.authenticate());
  }, [token]);

  const { i18n } = useTranslation();

  const { pathname } = location;
  const collapse_main_panel = [pathname === '/'].indexOf(true) !== -1;

  return (
    <>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      />
      <Switch>
        {/* Authentication routes */}
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/features" component={FeaturesPage} />
        <Route exact path="/pricing" component={PricingPage} />
        <Route exact path="/blog" component={BlogPage} />
        <Route exact path="/blogs/create" render={() => {
          const hash = window.location.hash.replace('#', '');
          if (hash === '/features') return <FeaturesPage />;
          if (hash === '/pricing') return <PricingPage />;
          if (hash === '/blog') return <BlogPage />;
          return <CreateBlog />;
        }} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route exact path="/auth/logout" component={LogoutPage} />
        {/* EndAuthentication routes */}
        <PrivateRoute path="/blogs/create" component={CreateBlog} />

        <PrivateRoute
          exact
          path="/blogs/:blog_id/posts/:id"
          component={CreatePost}
        />
        <MainPanel sidebarProps={{ collapse: collapse_main_panel }}>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/posts"
            component={PostsListing}
          />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/categories"
            component={CategoriesListing}
          />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/categories/create"
            component={CreateCategory}
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
          <PrivateRoute
            exact
            path="/blogs/:blog_id/settings"
            component={SettingsPage}
          />
          <PrivateRoute
            exact
            path="/blogs/:blog_id/settings/transfer"
            component={TransferPage}
          />
        </MainPanel>
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}