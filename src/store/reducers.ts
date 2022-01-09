/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';
// import userSliceReducer from '../features/user/index';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

// console.log(userSliceReducer);
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // injectedReducers['users'] = userSliceReducer;
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
