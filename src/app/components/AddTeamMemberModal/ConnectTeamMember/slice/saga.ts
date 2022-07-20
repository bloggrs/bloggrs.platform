import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { usersService } from 'services/users.service';
import { usersActions as actions } from '.';
import { LoadUsersAction } from './types';

function* getUsers({ payload: { query = '' } }) {
  yield put(actions.initSearchIfNotExists({ query }));
  try {
    const [users, _meta]: any = yield call(usersService.getUsers, query);
    yield put(actions.loaded({ query, users, _meta }));
  } catch (err) {
    yield put(actions.failed({ query, error: err }));
  }
}

export function* usersSaga() {
  yield takeLatest<LoadUsersAction, any>(actions.loadUsers.type, getUsers);
}
