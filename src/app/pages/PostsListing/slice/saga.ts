import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { postsActions as actions } from '.';
import { blogsService } from '../../../../services/blogs.service';
import { DeletePostAction, LoadPostsAction } from './types';

function* getPosts(action) {
  try {
    if (!action.payload.id) {
      throw new Error('Blog ID is required');
    }

    const response = yield call(blogsService.getPosts, {
      BlogId: action.payload.id,
      query: action.payload.query,
    });
    yield put(actions.loadSuccess({ posts: response }));
  } catch (error: any) {
    yield put(
      actions.loadFailed({
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        },
      }),
    );
  }
}

function* deletePost({ payload: { id, onSuccess } }) {
  try {
    yield call(blogsService.deleteBlogPost, id);
    yield put(actions.deleteSuccess({ id }));
    yield call(onSuccess);
  } catch (err) {
    yield put(actions.deleteFailed({ error: err }));
  }
}

export function* postsSaga() {
  yield takeLatest<LoadPostsAction, any>(actions.loadPosts.type, getPosts);
  yield takeLatest<DeletePostAction, any>(actions.deletePost.type, deletePost);
}
