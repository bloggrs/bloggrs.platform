import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Tag {
  id: number;
  name: string;
}
export interface TagsQueryString {
  tags: [Tag?];
  loading: boolean;
  error: [string?] | null;
  _meta: any;
}
export interface TagsState {
  [queryString: string]: TagsQueryString;
}

export interface LoadTagsAction extends Action {
  type: 'platform.tags/loadTags';
}

export interface DeleteTagAction extends Action {
  type: 'platform.tags/deleteTag';
}
