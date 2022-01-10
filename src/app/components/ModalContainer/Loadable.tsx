/**
 * Asynchronously loads the component for ModalContainer
 */

import { lazyLoad } from 'utils/loadable';

export const ModalContainer = lazyLoad(
  () => import('./index'),
  module => module.ModalContainer,
);
