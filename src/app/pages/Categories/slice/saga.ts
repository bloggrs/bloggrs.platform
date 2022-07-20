import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { categoriesService } from 'services/categoriesService.service';
import { categoriesActions as actions } from '.';
import { LoadCategoriesAction, DeleteCategoryAction } from './types';

function* getCategories({ payload: { query = '', page = 1, pageSize = 10 } }) {
  yield put(actions.initSearchIfNotExists({ query, page, pageSize }));
  try {
    const [categories, _meta]: any = yield call(
      categoriesService.getCategories,
      query,
      page,
      pageSize,
    );
    yield put(actions.loaded({ query, page, pageSize, categories, _meta }));
  } catch (err) {
    yield put(actions.failed({ query, page, pageSize, error: err }));
  }
}

function* deleteCategory({ payload: { id } }) {
  yield put(actions.initSearchIfNotExists({ id }));
  try {
    const { code }: any = yield call(categoriesService.deleteCategory, id);
    yield put(actions.removeCategory({ id }));
  } catch (err) {
    yield put(actions.failed({ id, error: err }));
  }
}

export function* categoriesSaga() {
  yield takeLatest<LoadCategoriesAction, any>(
    actions.loadPostCategories.type,
    getCategories,
  );
  yield takeLatest<DeleteCategoryAction, any>(
    actions.deleteCategory.type,
    deleteCategory,
  );
}
