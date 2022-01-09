/**
 * Asynchronously loads the component for ChooseBlogCategory
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseBlogCategory = lazyLoad(
  () => import('./index'),
  module => module.ChooseBlogCategory,
);
