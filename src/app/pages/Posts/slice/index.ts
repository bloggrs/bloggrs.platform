import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { postsSaga } from './saga';
import { PostsState } from './types';

export const initialState: PostsState = {
  egPaginatedString: {
    posts: [],
    loading: true,
    error: null,
    _meta: { count: 0 }
  },
};

const slice = createSlice({
  name: 'platform.posts',
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<any>) {},
    addPost(state, action: PayloadAction<any>) {
      const {
        payload: { post, query = "", page = 1, pageSize = 10 }
      } = action;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
      if (state[hash] === undefined) return state;
      return { 
        ...state,
        [ hash ]: {
          ...state[hash],
          posts: [
            ...state[hash].posts,
            post
          ]
        }
      } as any
    },
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query, page, pageSize  },
      } = action;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
      // if (state[hash] !== undefined) return;
      state[hash] = {
        posts: [],
        loading: true,
        error: null,
        _meta: undefined
      };
    },
    loaded(state, action: PayloadAction<any>) {
      const { query, page, pageSize, _meta } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`
      state[hash]._meta = _meta;
      state[hash].loading = false;
      state[hash].posts =
        action.payload.posts;
    },
    failed(state, action: PayloadAction<any>) {
      const { query, page, pageSize } = action.payload;
      const hash = `{"query":"${query}","page":${page},"pageSize"=${pageSize}}`

      state[hash].loading = false;
      state[hash].error = action.payload.error;
    },
  },
});

export const { actions: postsActions } = slice;

export const usePostsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: postsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = usePostsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
