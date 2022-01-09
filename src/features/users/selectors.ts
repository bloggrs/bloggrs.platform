import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.users || initialState;

export const selectUsers = createSelector([selectSlice], state => state);

export const isRegisterLoading = createSelector(
  [selectSlice],
  state => state.register.loading,
);

export const isRegisterError = createSelector(
  [selectSlice],
  state => state.register.error,
);
