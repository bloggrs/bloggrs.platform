/**
 * Asynchronously loads the component for PageNavigation
 */

import { lazyLoad } from 'utils/loadable';

export const PageNavigation = lazyLoad(
  () => import('./index'),
  module => module.PageNavigation,
);
