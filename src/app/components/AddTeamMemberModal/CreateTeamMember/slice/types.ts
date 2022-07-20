import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface User {
  id: number;
  name: string;
}
export interface UsersQueryString {
  users: [User?];
  loading: boolean;
  error: [string?] | null;
  _meta: any;
}
export interface UsersState {
  [queryString: string]: UsersQueryString;
}

export interface LoadUsersAction extends Action {
  type: 'platform.addTeamMember.users/loadUsers';
}