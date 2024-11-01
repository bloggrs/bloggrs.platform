/**
 * Asynchronously loads the component for NotAuthorized
 */

import { lazyLoad } from 'utils/loadable';

export const NotFoundPage = lazyLoad(
  () => import('./index'),
  module => module.NotAuthorized,
);
