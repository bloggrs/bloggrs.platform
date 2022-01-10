import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blogSaga } from './saga';
import { BlogState } from './types';

export const initialState: BlogState = {
  blog: [],
  loading: true,
  error: null,
};

const slice = createSlice({
  name: 'blogOverviewCard.blog',
  initialState,
  reducers: {
    loadBlog(state, action: PayloadAction<any>) {},
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      state.blog = action.payload.blog;
    },
    failed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { actions: blogActions } = slice;

export const useBlogSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: blogSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useBlogSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
