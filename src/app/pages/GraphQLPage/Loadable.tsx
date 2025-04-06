/**
 * Asynchronously loads the component for GraphQLPage
 */

import { lazyLoad } from 'utils/loadable';

export const GraphQLPage = lazyLoad(
  () => import('./index'),
  module => module.GraphQLPage,
);
