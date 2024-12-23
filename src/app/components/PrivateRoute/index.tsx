import {
  authUserSelector,
  isAuthLoading,
} from '../../../features/auth/selectors';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { LineLoader } from '../LineLoader';

interface PrivateRouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

// @ts-nocheck
export const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps): ReactElement => {
  const user = useSelector(authUserSelector);
  const loading = useSelector(isAuthLoading);
  if (loading) return <LineLoader />;
  if (!user) return <Redirect to="/auth/login" />;
  // @ts-ignore
  return <Route {...rest} component={Component} />;
};
