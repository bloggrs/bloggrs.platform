import { authUserSelector, isAuthLoading } from 'features/auth/selectors';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const LogoutPage = () => {
  const user = useSelector(authUserSelector);
  const loading = useSelector(isAuthLoading);
  useEffect(() => {
    if (user && !loading) {
      localStorage.removeItem('bloggrs:token');
      window.location.reload();
    }
  }, [user, loading]);
  if (!user && !loading) return <Redirect to="/auth/login" />;

  return <></>;
};
