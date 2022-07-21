import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state['medias'] || initialState;

export const selectedMedias = createSelector([selectSlice], state =>
  Object.keys(state)
    .map(query =>
      Array.isArray(state[query].medias) ? state[query].medias : [],
    )
    .flat(),
);

const paginatedMedias = {};
export const getPaginatedMedias = ({ query = '', page = 1, pageSize = 10 }) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedMedias[hash]) {
    paginatedMedias[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedMedias[hash]], state => state.medias);
};

export const getLoadingForPagination = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedMedias[hash]) {
    paginatedMedias[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedMedias[hash]], state => state.loading);
};

export const getMetaForPagination = ({
  query = '',
  page = 1,
  pageSize = 10,
}) => {
  const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
  if (!paginatedMedias[hash]) {
    paginatedMedias[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedMedias[hash]], state => state._meta || {});
};
