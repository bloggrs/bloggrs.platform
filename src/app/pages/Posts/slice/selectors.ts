import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['platform.posts'] || initialState;

export const selectPosts = createSelector([selectSlice], state =>
  Object.keys(state)
    .map(query => (Array.isArray(state[query].posts) ? state[query].posts : []))
    .flat(),
);

const paginatedPosts = {};
export const getPaginatedPosts = ({ query = '', page = 1, pageSize = 10 }) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedPosts[hash]) {
    paginatedPosts[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedPosts[hash]], state => state.posts);
};

export const getLoadingForPagination = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedPosts[hash]) {
    paginatedPosts[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedPosts[hash]], state => state.loading);
};

export const getMetaForPagination = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedPosts[hash]) {
    paginatedPosts[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedPosts[hash]], state => state._meta || {});
};
