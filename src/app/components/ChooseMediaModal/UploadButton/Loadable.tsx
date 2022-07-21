/**
 * Asynchronously loads the component for UploadButton
 */

import { lazyLoad } from 'utils/loadable';

export const UploadButton = lazyLoad(
  () => import('./index'),
  module => module.UploadButton,
);
