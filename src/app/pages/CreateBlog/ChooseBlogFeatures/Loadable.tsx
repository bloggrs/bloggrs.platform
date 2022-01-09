/**
 * Asynchronously loads the component for ChooseBlogFeatures
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseBlogFeatures = lazyLoad(
  () => import('./index'),
  module => module.ChooseBlogFeatures,
);
