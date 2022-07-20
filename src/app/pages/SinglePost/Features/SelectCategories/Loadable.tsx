/**
 * Asynchronously loads the component for SelectCategories
 */

import { lazyLoad } from 'utils/loadable';

export const SelectCategories = lazyLoad(
  () => import('./index'),
  module => module.SelectCategories,
);
