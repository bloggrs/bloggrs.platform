/**
 * Asynchronously loads the component for SingleBlog
 */

import { lazyLoad } from 'utils/loadable';

export const SingleBlog = lazyLoad(
  () => import('./index'),
  module => module.SingleBlog,
);
