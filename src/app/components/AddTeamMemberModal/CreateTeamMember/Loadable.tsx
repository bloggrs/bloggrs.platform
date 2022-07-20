/**
 * Asynchronously loads the component for CreateTeamMember
 */

import { lazyLoad } from 'utils/loadable';

export const CreateTeamMember = lazyLoad(
  () => import('./index'),
  module => module.CreateTeamMember,
);
