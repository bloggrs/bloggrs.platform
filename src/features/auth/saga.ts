import { call, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
import { authService } from '../../services/auth.service';
import { LoginAction, AuthenticateAction } from './types';

export function* login({ payload: { email, password, setSubmitting } }) {
  try {
    const payload: any = yield call(
      [authService, authService.login],
      email,
      password,
    );
    if (!payload?.data?.user || !payload?.data?.token) {
      throw new Error('Invalid response format from login');
    }
    payload.data.user.token = payload.data.token;
    yield put(actions.loginSuccess(payload.data.user));
    setSubmitting(false);
  } catch (err: any) {
    const errorMessage = err?.message || 'Login failed';
    yield put(actions.loginFailed(errorMessage));
    setSubmitting(false);
  }
}

export function* authenticate() {
  try {
    const payload: any = yield call([authService, authService.authenticate]);
    if (!payload?.data?.user) {
      throw new Error('Invalid response format from authenticate');
    }
    yield put(actions.authenticateSuccess(payload.data));
  } catch (err: any) {
    const errorMessage = err?.message || 'Authentication failed';
    yield put(actions.authenticateFailed(errorMessage));
  }
}

export function* authSaga() {
  yield takeLatest<LoginAction, any>('auth/login', login);
  yield takeLatest<AuthenticateAction, any>('auth/authenticate', authenticate);
}
