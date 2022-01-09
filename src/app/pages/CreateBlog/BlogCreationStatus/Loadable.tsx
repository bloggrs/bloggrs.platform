/**
 * Asynchronously loads the component for BlogCreationStatus
 */

import { lazyLoad } from 'utils/loadable';

export const BlogCreationStatus = lazyLoad(
  () => import('./index'),
  module => module.BlogCreationStatus,
);
