import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogCategoriesSaga } from './saga';
import { BlogCategoriesState } from './types';

export interface LoadBlogCategoriesPayload {
  query: string;
  headers: {
    Authorization: string;
  };
}

export const initialState: BlogCategoriesState = {
  egQueryString: {
    blogCategories: [],
    loading: true,
    error: null,
  },
};

interface LoadedPayload {
  query: string;
  blogCategories: any[]; // Consider replacing 'any' with proper type
}

interface FailedPayload {
  query: string;
  error: Error;
}

const slice = createSlice({
  name: 'createBlog.blogCategories',
  initialState,
  reducers: {
    loadBlogCategories(
      state,
      action: PayloadAction<LoadBlogCategoriesPayload>,
    ) {
      const { query } = action.payload;
      state[query] = {
        ...state[query],
        loading: true,
        error: null,
      };
    },
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
    loaded(state, action: PayloadAction<LoadedPayload>) {
      const { query, blogCategories } = action.payload;
      state[query].loading = false;
      state[query].blogCategories = blogCategories;
    },
    failed(state, action: PayloadAction<FailedPayload>) {
      const { query, error } = action.payload;
      state[query].loading = false;
      state[query].error = error;
    },
    setLoading(
      state,
      action: PayloadAction<{ query: string; loading: boolean }>,
    ) {
      const { query, loading } = action.payload;
      state[query].loading = loading;
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
