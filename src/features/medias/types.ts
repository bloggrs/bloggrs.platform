import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface Media {
  id: number;
  fieldName: string;
  originalName: string;
  encoding: string;
  mimetype: string;
  size: string;
  media_url: string;
  BlogId: number;
}

export interface MediasQueryString {
  medias: any;
  loading: boolean;
  error: [string?] | null;
  _meta: any;
}
export interface MediasState {
  [queryString: string]: MediasQueryString;
}

export interface LoadMediasAction extends Action {
  type: 'medias/loadMedias';
}
