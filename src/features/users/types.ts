import { Action } from '@reduxjs/toolkit';

/* --- STATE --- */
export interface RegisterStateRegisterObject {
  user: any;
  loading: boolean;
  error: [string] | any;
}

export interface RegisterState {
  register: RegisterStateRegisterObject;
}

export interface RegisterAction extends Action {
  type: 'users/register';
}
