import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => {
  return state?.categoriesListing ?? initialState;
};

export const getCategories = createSelector(
  [selectSlice],
  state => state?.categories ?? [],
);

export const isCategoriesLoading = createSelector(
  [selectSlice],
  state => state?.loading ?? false,
);

export const isCategoryDeleteLoading = createSelector(
  [selectSlice],
  state => state?.deleteLoading ?? false,
); 