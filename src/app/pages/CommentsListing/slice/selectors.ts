import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['commentsListing.comments'] || initialState;

export const getComments = createSelector(
  [selectSlice],
  state => state.comments,
);
export const isCommentsLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
