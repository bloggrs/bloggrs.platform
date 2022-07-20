import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['platform.tags'] || initialState;

export const selectTags = createSelector([selectSlice], state =>
  Object.keys(state)
    .map(query =>
      Array.isArray(state[query].tags) ? state[query].tags : [],
    )
    .flat(),
);

const paginatedTags = {};
export const getpaginatedTags = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedTags[hash]) {
    paginatedTags[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector(
    [paginatedTags[hash]],
    state => state.tags,
  );
};

export const getLoadingForPagination = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedTags[hash]) {
    paginatedTags[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector(
    [paginatedTags[hash]],
    state => state.loading,
  );
};

export const getMetaForPagination = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedTags[hash]) {
    paginatedTags[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector(
    [paginatedTags[hash]],
    state => state._meta || {},
  );
};
