import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogsSaga } from './saga';
import { BlogsState } from './types';

export const getSelectedBlogId = () => {
  const saved = localStorage.getItem('__bloggrs__::select_blog_id');
  const value = Number(saved);
  if (isNaN(value)) return undefined;
  return value;
};

export const initialState: BlogsState = {
  blogs: [],
  loading: true,
  error: [],
  selectedBlogId: getSelectedBlogId(),
};

const slice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    loadBlogs(state) {},
    loadBlogById(state) {},
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      state.blogs = action.payload.blogs;
      if (!state.selectedBlogId) state.selectedBlogId = state.blogs[0]?.id;
    },
    failed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    blogLoaded(state, action: PayloadAction<any>) {
      console.log('blogLoaded', action);
      const { blog }: any = action.payload;
      state.blogs = state.blogs.filter((b: any) => b.id !== blog.id);
      state.blogs.push(blog);
    },
    blogFailed(state, action: PayloadAction<any>) {},
    loadCurrentBlog(state, action: PayloadAction<any>) {},
    switchToBlogId(state, action: PayloadAction<any>) {
      const id = action.payload;
      localStorage.setItem('__bloggrs__::select_blog_id', id);
      state.selectedBlogId = Number(id);
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
