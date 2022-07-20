/**
 * Asynchronously loads the component for SelectTags
 */

import { lazyLoad } from 'utils/loadable';

export const SelectTags = lazyLoad(
  () => import('./index'),
  module => module.SelectTags,
);
