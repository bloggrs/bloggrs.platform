import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface AuthState {
  user: any | undefined;
  loading: boolean;
  error: any | undefined;
  token: string | undefined;
}

export interface LoginAction extends Action {
  type: 'auth/login';
}

export interface AuthenticateAction extends Action {
  type: 'auth/authenticate';
}
