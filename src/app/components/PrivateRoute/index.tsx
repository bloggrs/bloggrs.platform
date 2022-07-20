import {
  authUserSelector,
  isAuthLoading,
} from '../../../features/auth/selectors';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  useLocation,
} from 'react-router-dom';
import { LineLoader } from '../LineLoader';

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export const PrivateRoute = ({
  component: Component, allowGuest = false,
  ...rest
}: any): ReactElement | null => {
  const location = useLocation();
  const { pathname } = location;
  const onAuthentication = pathname.indexOf("/auth")
  const user = useSelector(authUserSelector);
  const loading = useSelector(isAuthLoading);
  if (loading) return <LineLoader />;
  const guestRule = allowGuest ? true : user.isGuest === false
  console.log({ allowGuest, user, guestRule })
  if (!user || (!guestRule)) {
    if (onAuthentication) return null;
    return <Redirect to="/auth/login" />;
  }
  return <Route {...rest} component={Component} render={Component} />;
};