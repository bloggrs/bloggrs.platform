import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogsSaga } from './saga';
import { BlogsState } from './types';

export const initialState: BlogsState = {
  egQueryString: {
    blogs: [],
    loading: true,
    error: null,
  },
};

const slice = createSlice({
  name: 'homePage.blogs',
  initialState,
  reducers: {
    loadBlogs(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query },
      } = action;
      state[query] = {
        blogs: [],
        loading: true,
        error: null,
      };
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state[action.payload.query].loading = false;
      state[action.payload.query].blogs = action.payload.blogs;
    },
    failed(state, action: PayloadAction<any>) {
      state[action.payload.query].loading = false;
      state[action.payload.query].error = action.payload.error;
    },
  },
});

export const { actions: blogsActions } = slice;

export const useBlogsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: blogsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useBlogsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
