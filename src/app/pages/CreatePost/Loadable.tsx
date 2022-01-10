/**
 * Asynchronously loads the component for CreatePost
 */

import { lazyLoad } from 'utils/loadable';

export const CreatePost = lazyLoad(
  () => import('./index'),
  module => module.CreatePost,
);
