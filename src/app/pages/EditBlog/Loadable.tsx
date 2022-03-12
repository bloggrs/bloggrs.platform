/**
 * Asynchronously loads the component for EditBlog
 */

 import { lazyLoad } from 'utils/loadable';

 export const EditBlog = lazyLoad(
   () => import('./index'),
   module => module.EditBlog,
 );
 