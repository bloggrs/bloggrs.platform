import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { categoriesService } from 'services/categoriesService.service';
import { categoriesActions as actions } from '.';
import { LoadCategoriesAction } from './types';

function* getCategories({ payload: { query = "", page = 1, pageSize = 10, } }) {
  yield put(actions.initSearchIfNotExists({ query, page, pageSize, }));
  try {
    const [categories, _meta]: any = yield call(
      categoriesService.getCategories,
      query, page, pageSize,
    );
    yield put(actions.loaded({ query, page, pageSize, categories, _meta }));
  } catch (err) {
    yield put(actions.failed({ query, page, pageSize, error: err }));
  }
}

export function* categoriesSaga() {
  yield takeLatest<LoadCategoriesAction, any>(
    actions.loadPostCategories.type,
    getCategories,
  );
}