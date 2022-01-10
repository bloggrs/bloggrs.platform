import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['postsListing.posts'] || initialState;

export const getPosts = createSelector([selectSlice], state => state.posts);
export const isPostsLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
