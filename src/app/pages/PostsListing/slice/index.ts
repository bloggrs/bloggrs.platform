import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { postsSaga } from './saga';
import { LatestPostsState } from './types';

export const initialState: LatestPostsState = {
  posts: [],
  loading: true,
  deleteLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'postsListing.posts',
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<any>) {},
    loadSuccess(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      // state.posts = action.payload.posts;
      state.posts.map(p => {
        const new_post = action.payload.posts.find(
          new_post => p.id === new_post.id,
        );
        if (new_post) return new_post;
        return p;
      });
      const addPosts = action.payload.posts.filter(
        p => !state.posts.find(i => p.id === i.id),
      );
      state.posts = state.posts.concat(addPosts);
    },
    loadFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    deletePost(state, action: PayloadAction<any>) {
      state.deleteLoading = true;
      console.log(JSON.stringify({ action }))
    },
    deleteSuccess(state, action: PayloadAction<any>) {
      const remove_id = action.payload.id;
      state.posts = state.posts.filter(p => p.id !== remove_id);
    },
    deleteFailed(state, action: PayloadAction<any>) {
      state.deleteLoading = false;
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
