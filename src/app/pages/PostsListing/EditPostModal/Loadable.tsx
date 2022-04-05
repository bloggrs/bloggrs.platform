/**
 * Asynchronously loads the component for EditPostModal
 */

import { lazyLoad } from 'utils/loadable';

export const EditPostModal = lazyLoad(
  () => import('./index'),
  module => module.EditPostModal,
);
