import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['platform.categories'] || initialState;

export const selectPostCategories = createSelector(
  [selectSlice],
  state => Object.keys(state).map(query => 
      Array.isArray(state[query].categories) ? state[query].categories
      : []
    ).flat(),
);

const paginatedPostCategories = {};
export const getPaginatedPostCategories = ({ query = "", page = 1, pageSize = 10 }) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
  if (!paginatedPostCategories[hash]) {
    paginatedPostCategories[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector(
    [paginatedPostCategories[hash]],
    state => state.categories,
  );
};

export const getLoadingForPagination = ({ query = "", page = 1, pageSize = 10 }) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
  if (!paginatedPostCategories[hash]) {
    paginatedPostCategories[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedPostCategories[hash]], state => state.loading);
};

export const getMetaForPagination = ({ query = "", page = 1, pageSize = 10 }) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
  if (!paginatedPostCategories[hash]) {
    paginatedPostCategories[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedPostCategories[hash]], state => state._meta || {});
};