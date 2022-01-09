/**
 * Asynchronously loads the component for ChooseBlogLogo
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseBlogLogo = lazyLoad(
  () => import('./index'),
  module => module.ChooseBlogLogo,
);
