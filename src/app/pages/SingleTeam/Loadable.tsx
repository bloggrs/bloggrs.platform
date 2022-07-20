/**
 * Asynchronously loads the component for SingleTeam
 */

import { lazyLoad } from 'utils/loadable';

export const SingleTeam = lazyLoad(
  () => import('./index'),
  module => module.SingleTeam,
);
