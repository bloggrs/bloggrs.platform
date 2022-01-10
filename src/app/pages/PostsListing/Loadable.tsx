/**
 * Asynchronously loads the component for PostsListing
 */

import { lazyLoad } from 'utils/loadable';

export const PostsListing = lazyLoad(
  () => import('./index'),
  module => module.PostsListing,
);
