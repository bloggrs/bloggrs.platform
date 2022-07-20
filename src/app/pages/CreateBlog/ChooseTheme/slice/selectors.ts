import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['createBlog.blogThemes'] || initialState;

export const selectBlogThemes = createSelector([selectSlice], state =>
  Object.keys(state)
    .map(query =>
      Array.isArray(state[query].blogThemes) ? state[query].blogThemes : [],
    )
    .flat(),
);

const forQuerySelectors = {};
export const getBlogsForQuery = query => {
  if (!forQuerySelectors[query]) {
    forQuerySelectors[query] = createSelector(
      [selectSlice],
      state => state[query] || initialState.egQueryString,
    );
  }
  return createSelector([forQuerySelectors[query]], state => state.blogThemes);
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
