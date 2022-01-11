/**
 * Asynchronously loads the component for CommentsListing
 */

import { lazyLoad } from 'utils/loadable';

export const CommentsListing = lazyLoad(
  () => import('./index'),
  module => module.CommentsListing,
);
