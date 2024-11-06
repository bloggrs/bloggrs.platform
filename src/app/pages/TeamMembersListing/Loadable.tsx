/**
 * Asynchronously loads the component for TeamMembersListing
 */

import { lazyLoad } from 'utils/loadable';

export const TeamMembersListing = lazyLoad(
  () => import('./index'),
  module => module.TeamMembersListing,
);
