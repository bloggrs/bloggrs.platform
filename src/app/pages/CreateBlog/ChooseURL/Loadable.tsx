/**
 * Asynchronously loads the component for ChooseURL
 */

import { lazyLoad } from 'utils/loadable';

export const ChooseURL = lazyLoad(
  () => import('./index'),
  module => module.ChooseURL,
);
