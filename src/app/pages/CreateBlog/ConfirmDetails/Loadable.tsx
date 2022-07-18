/**
 * Asynchronously loads the component for ConfirmDetails
 */

import { lazyLoad } from 'utils/loadable';

export const ConfirmDetails = lazyLoad(
  () => import('./index'),
  module => module.ConfirmDetails,
);
