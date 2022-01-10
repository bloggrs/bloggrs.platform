import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
// export interface BlogCategory {
//   id: number;
//   name: string;
// }
export interface BlogState {
  blog: any; //[BlogCategory?];
  loading: boolean;
  error: [string?] | null;
}

export interface LoadBlogAction extends Action {
  type: 'blogOverviewCard.blog/loadBlog';
}
