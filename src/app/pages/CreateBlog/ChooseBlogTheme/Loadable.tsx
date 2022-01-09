/**
 * Asynchronously loads the component for ChooseBlogTheme
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseBlogTheme = lazyLoad(
  () => import('./index'),
  module => module.ChooseBlogTheme,
);
