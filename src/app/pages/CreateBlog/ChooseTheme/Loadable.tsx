/**
 * Asynchronously loads the component for ChooseTheme
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseTheme = lazyLoad(
  () => import('./index'),
  module => module.ChooseTheme,
);
