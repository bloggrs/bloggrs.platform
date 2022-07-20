/**
 * Asynchronously loads the component for AddTeamMemberModal
 */

import { lazyLoad } from 'utils/loadable';

export const AddTeamMemberModal = lazyLoad(
  () => import('./index'),
  module => module.AddTeamMemberModal,
);
