import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadBlogCategoriesPayload, blogCategoriesActions } from '.';
import { PayloadAction } from '@reduxjs/toolkit';
import { blogCategoriesService } from 'services/blogCategories.service';

function* loadBlogCategories(action: PayloadAction<LoadBlogCategoriesPayload>) {
  const { query, headers } = action.payload;

  try {
    // Set loading state first
    yield put(blogCategoriesActions.setLoading({ query, loading: true }));

    // Make API call
    const response = yield call(
      blogCategoriesService.getBlogCategories,
      query,
    );

    // Only dispatch loaded action if we got a valid response
    if (response) {
      yield put(
        blogCategoriesActions.loaded({ query, blogCategories: response }),
      );
    } else {
      throw new Error('No data received from server');
    }
  } catch (error: any) {
    // Handle error with serializable message
    const errorMessage = error?.message || 'Failed to load blog categories';
    yield put(blogCategoriesActions.failed({ query, error: errorMessage }));
  } finally {
    yield put(blogCategoriesActions.setLoading({ query, loading: false }));
  }
}

export function* blogCategoriesSaga() {
  yield takeLatest(
    blogCategoriesActions.loadBlogCategories.type,
    loadBlogCategories,
  );
}
