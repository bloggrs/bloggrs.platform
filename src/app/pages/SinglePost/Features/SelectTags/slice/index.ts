import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { tagsSaga } from './saga';
import { TagsState } from './types';

export const initialState: TagsState = {
  egPaginatedString: {
    tags: [],
    loading: true,
    error: null,
    _meta: { count: 0 },
  },
};

const slice = createSlice({
  name: 'platform.createPost.tags',
  initialState,
  reducers: {
    loadTags(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query },
      } = action;
      const hash = `{"query":"${query}"}`;
      if (state[hash] !== undefined) return;
      state[hash] = {
        tags: [],
        loading: true,
        error: null,
        _meta: undefined,
      };
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      const { query, page, pageSize, _meta } = action.payload;
      const hash = `{"query":"${query}"}`;
      state[hash]._meta = _meta;
      state[hash].loading = false;
      state[hash].tags = action.payload.tags;
    },
    failed(state, action: PayloadAction<any>) {
      const { query, page, pageSize } = action.payload;
      const hash = `{"query":"${query}"}`;

      state[hash].loading = false;
      state[hash].error = action.payload.error;
    },
  },
});

export const { actions: tagsActions } = slice;

export const useTagsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tagsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTagsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
