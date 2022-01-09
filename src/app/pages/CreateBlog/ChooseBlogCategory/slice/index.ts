import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogCategoriesSaga } from './saga';
import { BlogCategoriesState } from './types';

export const initialState: BlogCategoriesState = {
  egQueryString: {
    blogCategories: [],
    loading: true,
    error: null,
  },
};

const slice = createSlice({
  name: 'createBlog.blogCategories',
  initialState,
  reducers: {
    loadBlogCategories(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query },
      } = action;
      state[query] = {
        blogCategories: [],
        loading: true,
        error: null,
      };
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state[action.payload.query].loading = false;
      state[action.payload.query].blogCategories =
        action.payload.blogCategories;
    },
    failed(state, action: PayloadAction<any>) {
      state[action.payload.query].loading = false;
      state[action.payload.query].error = action.payload.error;
    },
  },
});

export const { actions: blogCategoriesActions } = slice;

export const useBlogCategoriesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: blogCategoriesSaga });
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
