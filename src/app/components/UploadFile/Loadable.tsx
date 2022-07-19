/**
 * Asynchronously loads the component for UploadFile
 */

 import { lazyLoad } from 'utils/loadable';

 export const UploadFile = lazyLoad(
   () => import('./index'),
   module => module.UploadFile,
 );
 