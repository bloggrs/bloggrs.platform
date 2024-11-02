/**
 * Asynchronously loads the component for DeleteCategoryModal
 */

import { lazyLoad } from 'utils/loadable';

export const DeleteCategoryModal = lazyLoad(
  () => import('./index'),
  module => module.DeleteCategoryModal,
);
