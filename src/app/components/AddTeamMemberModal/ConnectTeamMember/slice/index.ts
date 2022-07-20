import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { usersSaga } from './saga';
import { UsersState } from './types';

export const initialState: UsersState = {
  egPaginatedString: {
    users: [],
    loading: true,
    error: null,
    _meta: { count: 0 },
  },
};

const slice = createSlice({
  name: 'platform.addTeamMember.users',
  initialState,
  reducers: {
    loadUsers(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query },
      } = action;
      const hash = `{"query":"${query}"}`;
      if (state[hash] !== undefined) return;
      state[hash] = {
        users: [],
        loading: true,
        error: null,
        _meta: undefined,
      };
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      const { query, _meta } = action.payload;
      const hash = `{"query":"${query}"}`;
      state[hash]._meta = _meta;
      state[hash].loading = false;
      state[hash].users = action.payload.users;
    },
    failed(state, action: PayloadAction<any>) {
      const { query } = action.payload;
      const hash = `{"query":"${query}"}`;

      state[hash].loading = false;
      state[hash].error = action.payload.error;
    },
  },
});

export const { actions: usersActions } = slice;

export const useUsersSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: usersSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUsersSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
