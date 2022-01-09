/**
 * Asynchronously loads the component for CreateBlog
 */

import { lazyLoad } from 'utils/loadable';

export const CreateBlog = lazyLoad(
  () => import('./index'),
  module => module.CreateBlog,
);
