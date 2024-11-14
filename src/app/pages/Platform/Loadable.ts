import { lazyLoad } from 'utils/loadable';

export const Platform = lazyLoad(
  () => import('./index'),
  module => module.Platform
); 