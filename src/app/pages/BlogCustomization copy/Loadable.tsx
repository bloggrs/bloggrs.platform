/**
 * Asynchronously loads the component for BlogCustomization
 */

import { lazyLoad } from 'utils/loadable';

export const BlogCustomization = lazyLoad(
  () => import('./index'),
  module => module.BlogCustomization,
);
