/**
 * Asynchronously loads the component for DeleteTeamMemberModal
 */

import { lazyLoad } from 'utils/loadable';

export const DeleteTeamMemberModal = lazyLoad(
  () => import('./index'),
  module => module.DeleteTeamMemberModal,
);
