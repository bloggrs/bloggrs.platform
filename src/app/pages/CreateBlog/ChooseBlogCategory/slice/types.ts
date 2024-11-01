import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface BlogCategory {
  id: number;
  name: string;
}
export interface BlogCategoriesQueryString {
  blogCategories: [BlogCategory?];
  loading: boolean;
  error: [string?] | null;
}
export interface BlogCategoriesState {
  [key: string]: {
    blogCategories: BlogCategory[];
    loading: boolean;
    error: null | Error;
  };
}

export interface LoadBlogCategoriesAction extends Action {
  type: 'createBlog.blogCategories/loadBlogCategories';
}
