import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { categoriesSaga } from './saga';
import { CategoriesState } from './types';

declare module 'types/RootState' {
  interface RootState {
    categoriesListing: CategoriesState;
  }
}

export const initialState: CategoriesState = {
  categories: [],
  loading: true,
  deleteLoading: false,
  error: undefined,
  isAuthorized: true,
};

const slice = createSlice({
  name: 'categoriesListing',
  initialState,
  reducers: {
    loadCategories(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    loadSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      if (!Array.isArray(action.payload?.categories)) {
        state.isAuthorized = false;
        return;
      }

      state.isAuthorized = true;
      const newCategories = action.payload.categories;
      const currentCategories = Array.isArray(state.categories) ? state.categories : [];

      const updatedCategories = currentCategories.map(c => {
        const new_category = newCategories.find(newCat => c.id === newCat.id);
        return new_category || c;
      });

      const addCategories = newCategories.filter(
        c => !currentCategories.find(i => c.id === i.id),
      );

      state.categories = updatedCategories.concat(addCategories);
    },
    loadFailed(
      state,
      action: PayloadAction<{ error: { message: string; status?: number } }>,
    ) {
      state.loading = false;
      state.error = action.payload.error.message;

      if (
        action.payload.error.message.includes('Cannot read properties') ||
        action.payload.error.status === 403 ||
        action.payload.error.message.includes('Blog ID is required')
      ) {
        state.isAuthorized = false;
      }
    },
    deleteCategory(state, action: PayloadAction<any>) {
      state.deleteLoading = true;
    },
    deleteSuccess(state, action: PayloadAction<any>) {
      const remove_id = action.payload.id;
      state.categories = state.categories.filter(c => c.id !== remove_id);
      state.deleteLoading = false;
    },
    deleteFailed(state, action: PayloadAction<any>) {
      state.deleteLoading = false;
    },
  },
});

export const { actions: categoriesActions } = slice;

export const useCategoriesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: categoriesSaga });
  return { actions: slice.actions };
}; 