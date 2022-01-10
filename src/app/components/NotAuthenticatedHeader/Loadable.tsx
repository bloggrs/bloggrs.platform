/**
 * Asynchronously loads the component for NotAuthenticatedHeader
 */

import { lazyLoad } from 'utils/loadable';

export const NotAuthenticatedHeader = lazyLoad(
  () => import('./index'),
  module => module.NotAuthenticatedHeader,
);
