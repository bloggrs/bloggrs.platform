import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { mediasService } from 'services/medias.service';
import { mediasActions as actions } from '.';
import { LoadMediasAction } from './types';

function* getMedias({ payload: { query = '', page = 1, pageSize = 10 } }) {
  yield put(actions.initSearchIfNotExists({ query, page, pageSize }));
  try {
    const [medias, _meta]: any = yield call(
      mediasService.getMedias,
      query,
      page,
      pageSize,
    );
    yield put(actions.loaded({ query, page, pageSize, medias, _meta }));
  } catch (err) {
    yield put(actions.failed({ query, page, pageSize, error: err }));
  }
}

export function* mediasSaga() {
  yield takeLatest<LoadMediasAction, any>(actions.loadMedias.type, getMedias);
}
