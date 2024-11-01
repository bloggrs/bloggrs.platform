import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '../../utils/redux-injectors';
import { authSaga } from './saga';
import { AuthState } from './types';

const TOKEN_KEY = 'bloggrs:token';

const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const initialState: AuthState = {
  user: undefined,
  loading: true,
  error: undefined,
  token: undefined,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = undefined;
      state.user = undefined;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;

      const payload = action.payload?.data || action.payload;

      if (payload?.data?.user) {
        state.user = payload.data.user;
        if (payload.data.token) {
          state.token = payload.data.token;
          setAuthToken(payload.data.token);
        }
      } else if (payload?.user) {
        state.user = payload.user;
        if (payload.token) {
          state.token = payload.token;
          setAuthToken(payload.token);
        }
      } else {
        state.user = payload;
        if (payload?.token) {
          state.token = payload.token;
          setAuthToken(payload.token);
        }
      }
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error =
        typeof action.payload === 'string' ? action.payload : 'Login failed';
      state.user = undefined;
    },
    authenticate(state) {
      state.loading = true;
      state.error = undefined;
      state.user = undefined;
    },
    authenticateSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = undefined;

      const payload = action.payload?.data || action.payload;

      if (payload?.data?.user) {
        state.user = payload.data.user;
        if (payload.data.token) {
          state.token = payload.data.token;
          setAuthToken(payload.data.token);
        }
      } else if (payload?.user) {
        state.user = payload.user;
        if (payload.token) {
          state.token = payload.token;
          setAuthToken(payload.token);
        }
      } else {
        state.user = payload;
        if (payload?.token) {
          state.token = payload.token;
          setAuthToken(payload.token);
        }
      }
    },
    authenticateFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
      state.user = undefined;
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
