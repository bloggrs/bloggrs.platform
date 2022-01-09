import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.auth || initialState;

export const selectAuth = createSelector([selectSlice], state => state);
export const authUserSelector = createSelector(
  [selectSlice],
  state => state.user,
);
export const isAuthLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
