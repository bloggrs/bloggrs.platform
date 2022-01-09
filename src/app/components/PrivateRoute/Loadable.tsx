/**
 * Asynchronously loads the component for PrivateRoute
 */

import { lazyLoad } from '../../../utils/loadable';

export const PrivateRoute = lazyLoad(
  () => import('./index'),
  module => module.PrivateRoute,
);
