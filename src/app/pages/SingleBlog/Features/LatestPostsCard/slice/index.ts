import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { postsSaga } from './saga';
import { LatestPostsState } from './types';

export const initialState: LatestPostsState = {
  posts: [],
  loading: true,
  error: null,
};

const slice = createSlice({
  name: 'latestPostsCard.posts',
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<any>) {},
    loaded(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      state.posts = action.payload.posts;
    },
    failed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload.error;
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
