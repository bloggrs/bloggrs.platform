/**
 * Asynchronously loads the component for CommentsPage
 */

import { lazyLoad } from 'utils/loadable';

export const CommentsPage = lazyLoad(
  () => import('./index'),
  module => module.CommentsPage,
);
