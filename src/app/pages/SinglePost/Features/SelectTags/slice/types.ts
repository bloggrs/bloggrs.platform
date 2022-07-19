import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Category {
  id: number;
  name: string;
}
export interface CategoriesQueryString {
  tags: [Category?];
  loading: boolean;
  error: [string?] | null;
  _meta: any;
}
export interface CategoriesState {
  [queryString: string]: CategoriesQueryString;
}

export interface LoadCategoriesAction extends Action {
  type: 'platform.createPost.tags/loadCategories';
}

export interface DeleteCategoryAction extends Action {
  type: 'platform.createPost.tags/deleteCategory';
}