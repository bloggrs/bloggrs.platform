/**
 * Asynchronously loads the component for Console
 */

import { lazyLoad } from '../../../utils/loadable';

export const Console = lazyLoad(
  () => import('./index'),
  module => module.Console,
);
