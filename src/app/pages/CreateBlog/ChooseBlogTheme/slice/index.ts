import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogThemesSaga } from './saga';
import { BlogThemesState } from './types';

export const initialState: BlogThemesState = {
  egQueryString: {
    blogThemes: [],
    loading: true,
    error: null,
  },
};

const slice = createSlice({
  name: 'createBlog.blogThemes',
  initialState,
  reducers: {
    loadBlogThemes(state, action: PayloadAction<any>) {},
    initSearchIfNotExists(state, action: PayloadAction<any>) {
      const {
        payload: { query },
      } = action;
      if (state[query] !== undefined) return;
      state[query] = {
        blogThemes: [],
        loading: true,
        error: null,
      };
    },
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state[action.payload.query].loading = false;
      state[action.payload.query].blogThemes = action.payload.blogThemes;
    },
    failed(state, action: PayloadAction<any>) {
      state[action.payload.query].loading = false;
      state[action.payload.query].error = action.payload.error;
    },
  },
});

export const { actions: themesActions } = slice;

export const useThemesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: blogThemesSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useThemesSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
