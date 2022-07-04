import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { postsActions as actions } from '.';
import { blogsService } from '../../../../services/blogs.service';
import { DeletePostAction, LoadPostsAction } from './types';

function* getPosts({ payload: { id, page = 1, pageSize = 10 } }) {
  try {
    const posts: any = yield call(blogsService.getPosts, {
      BlogId: id,
      query: { page, pageSize },
    });
    yield put(actions.loadSuccess({ posts }));
  } catch (err) {
    yield put(actions.loadFailed({ error: err }));
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
