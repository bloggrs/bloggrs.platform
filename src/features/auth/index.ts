import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '../../utils/redux-injectors';
import { authSaga } from './saga';
import { AuthState } from './types';

export const initialState: AuthState = {
  user: undefined,
  loading: true,
  error: undefined,
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
      state.error = undefined;
      state.user = action.payload;
    },
    loginFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
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
      state.user = action.payload;
    },
    authenticateFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
      state.user = undefined;
    },
  },
});

export const { actions: authActions } = slice;

console.log({ slice }, 2);

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
