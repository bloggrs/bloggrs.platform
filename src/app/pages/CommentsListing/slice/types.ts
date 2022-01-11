import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
// export interface BlogCategory {
//   id: number;
//   name: string;
// }
export interface CommentsState {
  comments: any; //[BlogCategory?];
  loading: boolean;
  deleteLoading: boolean;
  error: [string?] | null;
}

export interface LoadCommentsAction extends Action {
  type: 'commentsListing.comments/loadComments';
}

export interface DeleteCommentAction extends Action {
  type: 'commentsListing.comments/deleteComment';
}
