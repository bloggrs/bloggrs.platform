/**
 * Asynchronously loads the component for InformationalStep1
 */

import { lazyLoad } from 'utils/loadable';

export const InformationalStep1 = lazyLoad(
  () => import('./index'),
  module => module.InformationalStep1,
);
