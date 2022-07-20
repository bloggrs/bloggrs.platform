import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state['platform.addTeamMember.users'] || initialState;

export const selectUsers = createSelector(
  [selectSlice],
  state => Object.keys(state).map(query => 
      Array.isArray(state[query].users) ? state[query].users
      : []
    ).flat(),
);

const paginatedUsers = {};
export const getPaginatedUsers = ({ query = "" }) => {
  const hash = `{"query":"${query}"}`
  if (!paginatedUsers[hash]) {
    paginatedUsers[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector(
    [paginatedUsers[hash]],
    state => state.users,
  );
};

export const getLoadingForPagination = ({ query = "" }) => {
  const hash = `{"query":"${query}"}`
  if (!paginatedUsers[hash]) {
    paginatedUsers[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedUsers[hash]], state => state.loading);
};

export const getMetaForPagination = ({ query = "" }) => {
  const hash = `{"query":"${query}"}`
  if (!paginatedUsers[hash]) {
    paginatedUsers[hash] = createSelector(
      [selectSlice],
      state => state[hash] || initialState.egPaginatedString,
    );
  }
  return createSelector([paginatedUsers[hash]], state => state._meta || {});
};