/**
 * Asynchronously loads the component for SelectBlog
 */

import { lazyLoad } from 'utils/loadable';

export const SelectBlog = lazyLoad(
  () => import('./index'),
  module => module.SelectBlog,
);
