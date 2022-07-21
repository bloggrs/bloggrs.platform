import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { blogsService } from 'services/blogs.service';
import { blogsActions as actions, getSelectedBlogId } from '.';
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

function* getBlogById({ id, onSuccess = undefined, onFail = undefined }) {
  try {
    const blog: any = yield call(blogsService.getBlog, id);
    yield put(actions.blogLoaded({ blog }));
    if (onSuccess) call(onSuccess as any, blog);
  } catch (err) {
    console.info(err);
    if (onFail) call(onFail as any, err);
    yield put(actions.blogFailed({ error: err }));
  }
}

function* loadCurrentBlog() {
  const BlogId = getSelectedBlogId();
  yield call(getBlogById, { id: BlogId });
}
export function* blogsSaga() {
  yield takeLatest<LoadBlogsAction, any>(actions.loadBlogs.type, getBlogs);
  yield takeLatest<LoadBlogsAction, any>(
    actions.loadBlogById.type,
    getBlogById,
  );
  yield takeLatest<LoadBlogsAction, any>(
    actions.loadCurrentBlog.type,
    loadCurrentBlog,
  );
}
