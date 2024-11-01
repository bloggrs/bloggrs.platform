/**
 * Asynchronously loads the component for BlogPage
 */

import { lazyLoad } from 'utils/loadable';

export const BlogPage = lazyLoad(
  () => import('./index'),
  module => module.BlogPage,
);
