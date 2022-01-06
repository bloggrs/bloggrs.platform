import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application LoginPage" />
      </Helmet>
      <span>LoginPage container</span>
    </>
  );
}
