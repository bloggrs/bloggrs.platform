/**
 * Asynchronously loads the component for AdvancedPagination
 */

import { lazyLoad } from 'utils/loadable';

export const AdvancedPagination = lazyLoad(
  () => import('./index'),
  module => module.AdvancedPagination,
);
