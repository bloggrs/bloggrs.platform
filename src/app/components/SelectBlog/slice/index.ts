import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogsSaga } from './saga';
import { BlogsState } from './types';

export const initialState: BlogsState = {
  blogs: [],
  loading: true,
  error: []
};

const slice = createSlice({
  name: 'selectBlog.blogs',
  initialState,
  reducers: {
    loadBlogs(state) {},
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      state.blogs = action.payload.blogs;
    },
    failed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload.error;
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
 *  const { actions } = useBlogCategoriesSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
