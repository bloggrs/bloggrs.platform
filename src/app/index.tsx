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
import { PostsListing } from './pages/PostsListing/Loadable';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authUserSelector } from 'features/auth/selectors';

export function App() {
  const { actions } = useAuthSlice();
  const user = useSelector(authUserSelector);
  const { token } = user || {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authenticate());
  }, [token]);

  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/blogs/create" component={CreateBlog} />
        <PrivateRoute
          exact
          path="/blogs/:blog_id/posts"
          component={PostsListing}
        />
        <PrivateRoute
          exact
          path="/blogs/:blog_id/posts/create"
          component={CreatePost}
        />
        <PrivateRoute exact path="/blogs/:blog_id" component={SingleBlog} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route exact path="/auth/logout" component={LogoutPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer />
      <GlobalStyle />
    </BrowserRouter>
  );
}
