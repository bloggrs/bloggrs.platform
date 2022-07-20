import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['createBlog.blogCategories'] || initialState;

export const selectBlogCategories = createSelector([selectSlice], state =>
  Object.keys(state)
    .map(query =>
      Array.isArray(state[query].blogCategories)
        ? state[query].blogCategories
        : [],
    )
    .flat(),
);

const forQuerySelectors = {};
export const getBlogCategoriesForQuery = query => {
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
