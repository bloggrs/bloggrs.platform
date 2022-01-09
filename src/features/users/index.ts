import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '../../utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '../../utils/redux-injectors';
import { registerSaga } from './saga';
import { RegisterState } from './types';

export const initialState: RegisterState = {
  register: {
    user: undefined,
    loading: false,
    error: undefined,
  },
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    register(state, action: PayloadAction<any>) {
      state.register.loading = true;
      state.register.error = undefined;
      state.register.user = undefined;
    },
    registerSuccess(state, action: PayloadAction<any>) {
      state.register.loading = false;
      state.register.error = undefined;
      state.register.user = action.payload;
    },
    registerFailed(state, action: PayloadAction<any>) {
      state.register.loading = false;
      state.register.error = action.payload;
      state.register.user = undefined;
    },
  },
});

export const { actions: usersActions } = slice;

console.log({ slice }, 2);

export const useUsersSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerSaga });
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
