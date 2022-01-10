import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['createBlog.blogCategories'] || initialState;

export const selectBlogCategories = createSelector(
  [selectSlice],
  state => state,
);

const forQuerySelectors = {};
export const getBlogsForQuery = query => {
  if (!forQuerySelectors[query]) {
    forQuerySelectors[query] = createSelector(
      [selectSlice],
      state => state[query] || initialState.egQueryString,
    );
  }
  return createSelector(
    [forQuerySelectors[query]],
    state => state.blogCategories,
  );
};

export const getLoadingForQuery = query => {
  if (!forQuerySelectors[query]) {
    forQuerySelectors[query] = createSelector(
      [selectSlice],
      state => state[query] || initialState.egQueryString,
    );
  }
  return createSelector([forQuerySelectors[query]], state => state.loading);
};
