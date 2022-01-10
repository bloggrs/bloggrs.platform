/**
 * Asynchronously loads the component for MainPanel
 */

import { lazyLoad } from 'utils/loadable';

export const MainPanel = lazyLoad(
  () => import('./index'),
  module => module.MainPanel,
);
