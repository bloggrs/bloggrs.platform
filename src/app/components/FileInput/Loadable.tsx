/**
 * Asynchronously loads the component for FileInput
 */

import { lazyLoad } from 'utils/loadable';

export const FileInput = lazyLoad(
  () => import('./index'),
  module => module.FileInput,
);
