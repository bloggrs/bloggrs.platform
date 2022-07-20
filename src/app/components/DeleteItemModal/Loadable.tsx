/**
 * Asynchronously loads the component for DeleteItemModal
 */

import { lazyLoad } from 'utils/loadable';

export const DeleteItemModal = lazyLoad(
  () => import('./index'),
  module => module.DeleteItemModal,
);
