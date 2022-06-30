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
} from 'react-router-dom';
import { LineLoader } from '../LineLoader';

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

export const PrivateRoute = ({
  component: Component,
  ...rest
}: any): ReactElement => {
  const user = useSelector(authUserSelector);
  const loading = useSelector(isAuthLoading);
  if (true) return <LineLoader/>
  if (!user) return <Redirect to='/auth/login' />;
  return <Route {...rest} render={Component} />;
};
