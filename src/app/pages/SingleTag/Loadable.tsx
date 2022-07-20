/**
 * Asynchronously loads the component for SingleTag
 */

import { lazyLoad } from 'utils/loadable';

export const SingleTag = lazyLoad(
  () => import('./index'),
  module => module.SingleTag,
);
