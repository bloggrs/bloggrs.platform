import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Blog {
  id: number;
  name: string;
}
export interface BlogsState {
  blogs: Blog[];
  loading: boolean;
  error: [string?] | null;
  selectedBlogId?: number;
}

// export interface BlogsState {
//   [key: string]: BlogState;
// }

export interface LoadBlogsAction extends Action {
  type: 'blogs/loadBlogs';
}
