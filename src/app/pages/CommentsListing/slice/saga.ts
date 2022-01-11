import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { commentsActions as actions } from '.';
import { blogsService } from '../../../../services/blogs.service';
import { DeleteCommentAction, LoadCommentsAction } from './types';

function* getComments({ payload: { id, page = 1, pageSize = 10 } }) {
  try {
    const comments: any = yield call(blogsService.getComments, {
      BlogId: id,
      query: { page, pageSize },
    });
    yield put(actions.loadSuccess({ comments }));
  } catch (err) {
    yield put(actions.loadFailed({ error: err }));
  }
}

function* deleteComment({ payload: { id } }) {
  try {
    yield call(blogsService.deleteBlogComment, id);
    yield put(actions.deleteSuccess({ id }));
  } catch (err) {
    yield put(actions.deleteFailed({ error: err }));
  }
}

export function* commentsSaga() {
  yield takeLatest<LoadCommentsAction, any>(
    actions.loadComments.type,
    getComments,
  );
  yield takeLatest<DeleteCommentAction, any>(
    actions.deleteComment.type,
    deleteComment,
  );
}
