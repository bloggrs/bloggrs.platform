import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
// export interface BlogCategory {
//   id: number;
//   name: string;
// }
export interface LatestPostsState {
  posts: any; //[BlogCategory?];
  loading: boolean;
  error: [string?] | null;
}

export interface LoadPostsAction extends Action {
  type: 'latestPostsCard.posts/loadPosts';
}
