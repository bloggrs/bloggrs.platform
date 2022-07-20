import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Post {
  id: number;
  name: string;
}
export interface PostsQueryString {
  posts: [Post?];
  loading: boolean;
  error: [string?] | null;
  _meta: any;
}
export interface PostsState {
  [queryString: string]: PostsQueryString;
}

export interface LoadPostsAction extends Action {
  type: 'platform.posts/loadPosts';
}
