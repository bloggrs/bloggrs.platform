import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Category {
  id: number;
  name: string;
}

export interface CategoriesState {
  categories: Category[];
  blogpostcategories: any[];
  loading: boolean;
  deleteLoading: boolean;
  error?: string;
  isAuthorized: boolean;
}

export interface LoadCategoriesAction extends Action {
  type: 'categories/loadCategories';
}

export interface DeleteCategoryAction extends Action {
  type: 'categories/deleteCategory';
}
