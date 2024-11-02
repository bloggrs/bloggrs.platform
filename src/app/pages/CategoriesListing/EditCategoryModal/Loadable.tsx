/**
 * Asynchronously loads the component for EditCategoryModal
 */

import { lazyLoad } from 'utils/loadable';

export const EditCategoryModal = lazyLoad(
  () => import('./index'),
  module => module.EditCategoryModal,
);
