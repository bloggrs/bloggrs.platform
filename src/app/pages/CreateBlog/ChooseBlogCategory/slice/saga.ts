import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { blogCategoriesActions as actions } from '.';
import { blogCategoriesService } from '../../../../../services/blogCategories.service';
import { LoadBlogCategoriesAction } from './types';

function* getBlogCategories({ payload: { query } }) {
  yield put(actions.initSearchIfNotExists({ query }));
  try {
    const blogCategories: any = yield call(
      blogCategoriesService.getBlogCategories,
      query,
    );
    yield put(actions.loaded({ query, blogCategories }));
  } catch (err) {
    yield put(actions.failed({ query, error: err }));
  }
}

export function* blogCategoriesSaga() {
  yield takeLatest<LoadBlogCategoriesAction, any>(
    actions.loadBlogCategories.type,
    getBlogCategories,
  );
}
