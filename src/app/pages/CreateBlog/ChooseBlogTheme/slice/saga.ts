import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { themesActions as actions } from '.';
import { blogThemesService } from '../../../../../services/blogThemes.service';
import { LoadBlogThemesAction } from './types';

function* getBlogThemes({ payload: { query } }) {
  yield put(actions.initSearchIfNotExists({ query }));
  try {
    const blogThemes: any = yield call(blogThemesService.getBlogThemes, query);
    yield put(actions.loaded({ query, blogThemes }));
  } catch (err) {
    yield put(actions.failed({ query, error: err }));
  }
}

export function* blogThemesSaga() {
  yield takeLatest<LoadBlogThemesAction, any>(
    actions.loadBlogThemes.type,
    getBlogThemes,
  );
}
