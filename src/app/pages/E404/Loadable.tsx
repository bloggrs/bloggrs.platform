/**
 * Asynchronously loads the component for E404
 */

 import { lazyLoad } from 'utils/loadable';

 export const E404 = lazyLoad(
   () => import('./index'),
   module => module.E404,
 );
 