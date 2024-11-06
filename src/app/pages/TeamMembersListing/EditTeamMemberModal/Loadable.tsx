/**
 * Asynchronously loads the component for EditTeamMemberModal
 */

import { lazyLoad } from 'utils/loadable';

export const EditTeamMemberModal = lazyLoad(
  () => import('./index'),
  module => module.EditTeamMemberModal,
);
