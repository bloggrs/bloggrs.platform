import { DeleteCategoryAction } from 'app/pages/Categories/slice/types';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { tagsService } from 'services/tagsService.service';
import { tagsActions as actions } from '.';
import { LoadTagsAction } from './types';

function* getTags({ payload: { query = '', page = 1, pageSize = 10 } }) {
  yield put(actions.initSearchIfNotExists({ query, page, pageSize }));
  try {
    const [tags, _meta]: any = yield call(tagsService.getTags, query);
    yield put(actions.loaded({ query, page, pageSize, tags, _meta }));
  } catch (err) {
    yield put(actions.failed({ query, page, pageSize, error: err }));
  }
}

export function* tagsSaga() {
  yield takeLatest<LoadTagsAction, any>(actions.loadTags.type, getTags);
}
