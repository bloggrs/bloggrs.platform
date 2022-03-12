import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { blogsActions as actions } from '.';
import { blogsService } from '../../../../services/blogs.service';
import { LoadBlogsAction } from './types';

function* getMyBlogs({ payload: { query } }) {
  yield put(actions.initSearchIfNotExists({ query }));
  try {
    const blogs: any = yield call(blogsService.getMyBlogs, query);
    yield put(actions.loaded({ query, blogs }));
  } catch (err) {
    yield put(actions.failed({ query, error: err }));
  }
}

export function* blogsSaga() {
  yield takeLatest<LoadBlogsAction, any>(actions.loadBlogs.type, getMyBlogs);
}
