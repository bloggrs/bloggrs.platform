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
  isAuthorized: true,
};

const slice = createSlice({
  name: 'postsListing.posts',
  initialState,
  reducers: {
    loadPosts(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    loadSuccess(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      // Check if payload.posts is an array
      if (!Array.isArray(action.payload?.posts)) {
        state.isAuthorized = false;
        return;
      }

      // Set isAuthorized to true since we have valid posts array
      state.isAuthorized = true;

      // Safely handle posts array
      const newPosts = action.payload.posts;

      // Ensure state.posts is an array before mapping
      const currentPosts = Array.isArray(state.posts) ? state.posts : [];

      // Update existing posts
      const updatedPosts = currentPosts.map(p => {
        const new_post = newPosts.find(newPost => p.id === newPost.id);
        return new_post || p;
      });

      // Add new posts that don't exist in current state
      const addPosts = newPosts.filter(
        p => !currentPosts.find(i => p.id === i.id),
      );

      state.posts = updatedPosts.concat(addPosts);
    },
    loadFailed(
      state,
      action: PayloadAction<{ error: { message: string; status?: number } }>,
    ) {
      state.loading = false;
      state.error = action.payload.error.message;

      // Set isAuthorized to false if:
      // 1. We can't read properties
      // 2. We get a 403 status
      // 3. Blog ID is missing (which means we're not properly authenticated/authorized)
      if (
        action.payload.error.message.includes('Cannot read properties') ||
        action.payload.error.message.includes(
          "Cannot read properties of undefined (reading 'posts')",
        ) ||
        action.payload.error.status === 403 ||
        action.payload.error.message.includes('Blog ID is required')
      ) {
        state.isAuthorized = false;
      }
    },
    deletePost(state, action: PayloadAction<any>) {
      state.deleteLoading = true;
      console.log(JSON.stringify({ action }));
    },
    deleteSuccess(state, action: PayloadAction<any>) {
      const remove_id = action.payload.id;
      state.posts = state.posts.filter(p => p.id !== remove_id);
      state.deleteLoading = false;
    },
    deleteFailed(state, action: PayloadAction<any>) {
      state.deleteLoading = false;
    },
    loadPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadPostsError(state, action) {
      state.loading = false;
      state.error = action.payload;
      if (action.payload?.status === 403) {
        state.isAuthorized = false;
      }
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
