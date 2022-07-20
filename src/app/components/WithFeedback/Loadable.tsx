/**
 * Asynchronously loads the component for WithFeedback
 */

import { lazyLoad } from 'utils/loadable';

export const WithFeedback = lazyLoad(
  () => import('./index'),
  module => module.WithFeedback,
);
