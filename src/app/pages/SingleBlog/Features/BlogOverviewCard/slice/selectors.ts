import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['blogOverviewCard.blog'] || initialState;

export const getBlog = createSelector([selectSlice], state => state.blog);
export const isBlogLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
