/**
 * Asynchronously loads the component for ConnectTeamMember
 */

import { lazyLoad } from 'utils/loadable';

export const ConnectTeamMember = lazyLoad(
  () => import('./index'),
  module => module.ConnectTeamMember,
);
