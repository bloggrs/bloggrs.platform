import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Blog {
  id: number;
  name: string;
}
export interface BlogsQueryString {
  blogs: [Blog?];
  loading: boolean;
  error: [string?] | null;
}
export interface BlogsState {
  [queryString: string]: BlogsQueryString;
}

export interface LoadBlogsAction extends Action {
  type: 'homePage.blogs/loadBlogs';
}
