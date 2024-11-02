import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../types';
import { initialState } from '.';

const selectSlice = (state: RootState) => {
  return state?.auth ?? initialState;
};

export const selectAuth = createSelector(
  [selectSlice],
  state => state ?? initialState,
);

export const authUserSelector = createSelector(
  [selectSlice],
  state => state?.user ?? null,
);

export const isAuthLoading = createSelector(
  [selectSlice],
  state => state?.loading ?? false,
);
