import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Blog {
  id: number;
  name: string;
}
export interface BlogsState {
  blogs: [Blog?];
  loading: boolean;
  error: [string?] | null;
}

export interface LoadBlogsAction extends Action {
  type: 'selectBlog.blogs/loadBlogs';
}
