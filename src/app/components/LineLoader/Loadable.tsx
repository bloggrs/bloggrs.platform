/**
 * Asynchronously loads the component for LineLoader
 */

import { lazyLoad } from 'utils/loadable';

export const LineLoader = lazyLoad(
  () => import('./index'),
  module => module.LineLoader,
);
