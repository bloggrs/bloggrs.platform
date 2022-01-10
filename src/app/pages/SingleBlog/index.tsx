import * as React from 'react';
import { BlogOverviewCard } from './Features/BlogOverviewCard';
import { LatestPostsCard } from './Features/LatestPostsCard';

export const SingleBlog = () => {
  return (
    <>
      SingleBlog
      <br />
      <hr />
      <BlogOverviewCard />
      <br />
      <hr />
      <LatestPostsCard />
    </>
  );
};
