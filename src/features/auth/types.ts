import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface AuthState {
  user: any;
  loading: boolean;
  error: [string] | any;
}

export interface LoginAction extends Action {
  type: 'auth/login';
}

export interface AuthenticateAction extends Action {
  type: 'auth/authenticate';
}
