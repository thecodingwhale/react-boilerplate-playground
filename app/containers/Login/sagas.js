import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadApi, successApi, errorApi } from 'containers/App/actions';
import request from 'utils/request';
import { SUBMIT_CREDENTIALS } from './constants';

export function* login(action) {
  const { email, password } = action;
  const url = `/api/auth/login?email=${email}&password=${password}`;

  yield put(loadApi());

  try {
    const api = yield call(request, url, {
      method: 'POST',
    });
    yield put(successApi(api));
  } catch (err) {
    yield put(errorApi(err));
  }
}

export function* authentication() {
  const watcher = yield takeLatest(SUBMIT_CREDENTIALS, login);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  authentication,
];
