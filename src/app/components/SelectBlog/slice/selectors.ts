import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['selectBlog.blogs'] || initialState;

export const selectBlogs = createSelector(
  [selectSlice],
  state => state.blogs
);

export const getIsLoading = createSelector([ selectSlice ], state => state.loading);