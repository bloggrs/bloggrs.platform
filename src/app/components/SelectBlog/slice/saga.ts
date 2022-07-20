import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { blogsService } from 'services/blogs.service';
import { blogsActions as actions } from '.';
import { LoadBlogsAction } from './types';

function* getBlogs() {
  try {
    const blogs: any = yield call(blogsService.getMyBlogs);
    yield put(actions.loaded({ blogs }));
  } catch (err) {
    console.info(err);
    yield put(actions.failed({ error: err }));
  }
}

export function* blogsSaga() {
  yield takeLatest<LoadBlogsAction, any>(actions.loadBlogs.type, getBlogs);
}
