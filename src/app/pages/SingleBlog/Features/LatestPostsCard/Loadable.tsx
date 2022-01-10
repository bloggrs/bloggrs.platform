/**
 * Asynchronously loads the component for LatestPostsCard
 */

import { lazyLoad } from 'utils/loadable';

export const LatestPostsCard = lazyLoad(
  () => import('./index'),
  module => module.LatestPostsCard,
);
