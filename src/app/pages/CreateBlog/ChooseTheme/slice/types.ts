import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface BlogTheme {
  id: number;
  name: string;
  description: string;
}
export interface BlogThemesQueryString {
  blogThemes: [BlogTheme?];
  loading: boolean;
  error: [string?] | null;
}
export interface BlogThemesState {
  [queryString: string]: BlogThemesQueryString;
}

export interface LoadBlogThemesAction extends Action {
  type: 'createBlog.blogThemes/loadBlogThemes';
}
