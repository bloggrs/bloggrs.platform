/**
 * Asynchronously loads the component for CategoriesListing
 */

import { lazyLoad } from 'utils/loadable';

export const CategoriesListing = lazyLoad(
  () => import('./index'),
  module => module.CategoriesListing,
);
