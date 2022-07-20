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
  name: 'platform.tags',
  initialState,
  reducers: {
    loadTags(state, action: PayloadAction<any>) {},
    removeTag(state, action: PayloadAction<any>) {
      const keys = Object.keys(state);
      const filter_rule = tag => tag.id !== action.payload.id;
      const new_state = {};
      for (let key of keys) {
        const value: any = state[key];
        if (Array.isArray(value.tags)) {
          value.tags = value.tags.filter(filter_rule);
        }
        new_state[key] = value;
      }
      state = { ...new_state };
    },
    deleteTag(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query, page, pageSize },
      } = action;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
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
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;
      state[hash]._meta = _meta;
      state[hash].loading = false;
      state[hash].tags = action.payload.tags;
    },
    failed(state, action: PayloadAction<any>) {
      const { query, page, pageSize } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`;

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
