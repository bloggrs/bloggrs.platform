/**
 * Asynchronously loads the component for PricingPage
 */

import { lazyLoad } from 'utils/loadable';

export const PricingPage = lazyLoad(
  () => import('./index'),
  module => module.PricingPage,
);
