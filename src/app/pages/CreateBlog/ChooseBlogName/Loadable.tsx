/**
 * Asynchronously loads the component for ChooseBlogName
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseBlogName = lazyLoad(
  () => import('./index'),
  module => module.ChooseBlogName,
);
