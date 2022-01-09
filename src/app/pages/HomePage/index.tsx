import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';

const _HomePage = function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>HomePage container</span>
    </>
  );
};

export const HomePage = connect(state => {
  console.log({ state });
  return {};
})(_HomePage);
