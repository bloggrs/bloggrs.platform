import { MainPanel } from 'app/components/MainPanel';
import * as React from 'react';
import { BlogOverviewCard } from './Features/BlogOverviewCard';
import { LatestPostsCard } from './Features/LatestPostsCard';

export const SingleBlog = () => {
  return (
    <MainPanel>
      SingleBlog
      <br />
      <hr />
      <BlogOverviewCard />
      <br />
      <hr />
      <LatestPostsCard />
    </MainPanel>
  );
};
