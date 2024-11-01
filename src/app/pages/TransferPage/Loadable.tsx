/**
 * Asynchronously loads the component for TransferPage
 */

import { lazyLoad } from 'utils/loadable';

export const TransferPage = lazyLoad(
  () => import('./index'),
  module => module.TransferPage,
);
