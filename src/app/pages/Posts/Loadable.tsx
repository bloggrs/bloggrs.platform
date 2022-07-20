/**
 * Asynchronously loads the component for Posts
 */

import { lazyLoad } from 'utils/loadable';

export const Posts = lazyLoad(
  () => import('./index'),
  module => module.Posts,
);
