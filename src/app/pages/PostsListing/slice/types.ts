import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
// export interface BlogCategory {
//   id: number;
//   name: string;
// }
export interface LatestPostsState {
  posts: any; //[BlogCategory?];
  loading: boolean;
  deleteLoading: boolean;
  error: [string?] | null;
}

export interface LoadPostsAction extends Action {
  type: 'postsListing.posts/loadPosts';
}

export interface DeletePostAction extends Action {
  type: 'postsListing.posts/deletePost';
}
