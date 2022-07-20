/**
 * Asynchronously loads the component for SinglePost
 */

import { lazyLoad } from 'utils/loadable';

export const SinglePost = lazyLoad(
  () => import('./index'),
  module => module.SinglePost,
);
