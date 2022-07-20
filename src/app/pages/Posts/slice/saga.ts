import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { blogsService } from 'services/blogs.service';
import { postsActions as actions } from '.';
import { LoadPostsAction } from './types';

function* getPosts({ payload: { query = '', page = 1, pageSize = 10 } }) {
  yield put(actions.initSearchIfNotExists({ query, page, pageSize }));
  try {
    const [posts, _meta]: any = yield call(
      blogsService.getPosts as any,
      query,
      page,
      pageSize,
    );
    yield put(actions.loaded({ query, page, pageSize, posts, _meta }));
  } catch (err) {
    yield put(actions.failed({ query, page, pageSize, error: err }));
  }
}

export function* postsSaga() {
  yield takeLatest<LoadPostsAction, any>(actions.loadPosts.type, getPosts);
}
