/**
 * Asynchronously loads the component for BlogOverviewCard
 */

import { lazyLoad } from 'utils/loadable';

export const BlogOverviewCard = lazyLoad(
  () => import('./index'),
  module => module.BlogOverviewCard,
);
