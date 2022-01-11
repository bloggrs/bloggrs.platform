import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { MainPanel } from '../../components/MainPanel';

const _HomePage = function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name='description' content='A Boilerplate application homepage' />
      </Helmet>
      <MainPanel>HomePage contdasainer</MainPanel>
    </>
  );
};

export const HomePage = connect(state => {
  console.log({ state });
  return {};
})(_HomePage);
