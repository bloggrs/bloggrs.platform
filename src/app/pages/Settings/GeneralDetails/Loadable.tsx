/**
 * Asynchronously loads the component for GeneralDetails
 */

 import { lazyLoad } from 'utils/loadable';

 export const GeneralDetails = lazyLoad(
   () => import('./index'),
   module => module.GeneralDetails,
 );
 