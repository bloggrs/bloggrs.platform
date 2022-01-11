import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { commentsSaga } from './saga';
import { CommentsState } from './types';

export const initialState: CommentsState = {
  comments: [],
  loading: true,
  deleteLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'commentsListing.comments',
  initialState,
  reducers: {
    loadComments(state, action: PayloadAction<any>) {},
    loadSuccess(state, action: PayloadAction<any>) {
      console.log('loaded', action);
      state.loading = false;
      // state.comments = action.payload.comments;
      state.comments.map(p => {
        const new_comment = action.payload.comments.find(
          new_comment => p.id === new_comment.id,
        );
        if (new_comment) return new_comment;
        return p;
      });
      const addComments = action.payload.comments.filter(
        p => !state.comments.find(i => p.id === i.id),
      );
      state.comments = state.comments.concat(addComments);
    },
    loadFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteComment(state, action: PayloadAction<any>) {
      state.deleteLoading = true;
    },
    deleteSuccess(state, action: PayloadAction<any>) {
      const remove_id = action.payload.id;
      state.comments = state.comments.filter(p => p.id !== remove_id);
    },
    deleteFailed(state, action: PayloadAction<any>) {
      state.deleteLoading = false;
    },
  },
});

export const { actions: commentsActions } = slice;

export const useCommentsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: commentsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useCommentsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
