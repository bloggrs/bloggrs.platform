import { call, put, takeLatest } from 'redux-saga/effects';
import { usersActions as actions } from '.';
import { RegisterAction } from './types';
import { usersService } from '../../services/users.service';
import { authActions } from 'features/auth';

export function* register({
  payload: { first_name, last_name, email, password },
}) {
  try {
    const payload: any = yield call(
      usersService.register,
      first_name,
      last_name,
      email,
      password,
    );
    payload.data.user.token = payload.data.token;
    yield put(actions.registerSuccess(payload.data.user));
    yield put(authActions.loginSuccess(payload.data.user));
  } catch (err) {
    console.log(err);
    yield put(actions.registerFailed(err));
  }
}

export function* registerSaga() {
  yield takeLatest<RegisterAction, any>('users/register', register);
}
