import { call, put, takeLatest } from 'redux-saga/effects';
import { categoriesActions as actions } from '.';
import { blogsService } from '../../../../services/blogs.service';
import { DeleteCategoryAction, LoadCategoriesAction } from './types';

function* getCategories(action) {
  try {
    if (!action.payload.id) {
      throw new Error('Blog ID is required');
    }

    const response = yield call(blogsService.getCategories);
    yield put(actions.loadSuccess({ blogpostcategories: response }));
  } catch (error: any) {
    yield put(
      actions.loadFailed({
        error: {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        },
      }),
    );
  }
}

function* deleteCategory({ payload: { id, onSuccess } }) {
  try {
    yield call(blogsService.deleteBlogCategory, id);
    yield put(actions.deleteSuccess({ id }));
    yield call(onSuccess);
  } catch (err) {
    yield put(actions.deleteFailed({ error: err }));
  }
}

export function* categoriesSaga() {
  yield takeLatest<LoadCategoriesAction, any>(
    actions.loadCategories.type,
    getCategories,
  );
  yield takeLatest<DeleteCategoryAction, any>(
    actions.deleteCategory.type,
    deleteCategory,
  );
}
