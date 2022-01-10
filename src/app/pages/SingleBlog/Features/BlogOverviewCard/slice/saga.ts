import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { blogActions as actions } from '.';
import { blogsService } from '../../../../../../services/blogs.service';
import { LoadBlogAction } from './types';

function* getBlog({ payload: { id } }) {
  try {
    const blog: any = yield call(blogsService.getBlog, id);
    yield put(actions.loaded({ blog }));
  } catch (err) {
    yield put(actions.failed({ error: err }));
  }
}

export function* blogSaga() {
  yield takeLatest<LoadBlogAction, any>(actions.loadBlog.type, getBlog);
}
