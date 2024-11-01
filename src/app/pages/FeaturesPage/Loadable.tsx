/**
 * Asynchronously loads the component for FeaturesPage
 */

import { lazyLoad } from 'utils/loadable';

export const FeaturesPage = lazyLoad(
  () => import('./index'),
  module => module.FeaturesPage,
);
