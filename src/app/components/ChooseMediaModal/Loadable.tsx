/**
 * Asynchronously loads the component for ChooseMediaModal
 */

 import { lazyLoad } from 'utils/loadable';

 export const ChooseMediaModal = lazyLoad(
   () => import('./index'),
   module => module.ChooseMediaModal,
 );
 