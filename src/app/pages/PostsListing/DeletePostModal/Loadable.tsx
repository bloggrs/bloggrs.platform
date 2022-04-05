/**
 * Asynchronously loads the component for DeletePostModal
 */

import { lazyLoad } from 'utils/loadable';

export const DeletePostModal = lazyLoad(
  () => import('./index'),
  module => module.DeletePostModal,
);
