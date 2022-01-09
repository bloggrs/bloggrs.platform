import { call, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
import { authService } from '../../services/auth.service';
import { LoginAction, AuthenticateAction } from './types';

export function* login({ payload: { email, password, setSubmitting } }) {
  console.log({ setSubmitting });
  try {
    const payload: any = yield call(authService.login, email, password);
    payload.data.user.token = payload.data.token;
    yield put(actions.loginSuccess(payload.data.user));
    setSubmitting(false);
  } catch (err) {
    console.log(err);
    yield put(actions.loginFailed(err));
  }
}

export function* authenticate() {
  try {
    const payload: any = yield call(authService.authenticate);
    yield put(actions.authenticateSuccess(payload.data.user));
  } catch (err) {
    yield put(actions.authenticateFailed(err));
  }
}

export function* authSaga() {
  yield takeLatest<LoginAction, any>('auth/login', login);
  yield takeLatest<AuthenticateAction, any>('auth/authenticate', authenticate);
}
