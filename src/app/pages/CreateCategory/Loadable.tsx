/**
 * Asynchronously loads the component for CreateCategory
 */

import { lazyLoad } from 'utils/loadable';

export const CreateCategory = lazyLoad(
  () => import('./index'),
  module => module.CreateCategory,
);
