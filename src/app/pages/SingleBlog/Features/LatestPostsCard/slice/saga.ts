import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { postsActions as actions } from '.';
import { blogsService } from '../../../../../../services/blogs.service';
import { LoadPostsAction } from './types';

function* getPosts({ payload: { id, page = 1, pageSize = 10 } }) {
  try {
    const posts: any = yield call(() =>
      blogsService.getPosts({ BlogId: id, query: { page, pageSize } }),
    );
    yield put(actions.loaded({ posts }));
  } catch (err) {
    yield put(actions.failed({ error: err }));
  }
}

export function* postsSaga() {
  yield takeLatest<LoadPostsAction, any>(actions.loadPosts.type, getPosts);
}
