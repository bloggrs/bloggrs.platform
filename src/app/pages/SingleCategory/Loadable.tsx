/**
 * Asynchronously loads the component for SingleCategory
 */

import { lazyLoad } from 'utils/loadable';

export const SingleCategory = lazyLoad(
  () => import('./index'),
  module => module.SingleCategory,
);
