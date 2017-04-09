/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
/* eslint-disable no-unused-vars */
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadApi, successApi, errorApi } from 'containers/App/actions';
import { login, authentication } from '../sagas';
import request from '../../../utils/request';
import { SUBMIT_CREDENTIALS } from '../constants';

describe('login Saga', () => {
  const fixture = {
    email: 'email@email.com',
    password: '1234',
  };
  const loginSaga = login(fixture);

  it('should dispatch put saga and call loadApi()', () => {
    const putDiscriptor = loginSaga.next().value;

    expect(putDiscriptor).toEqual(put(loadApi()));
  });

  it('should dispatch call saga and process the request', () => {
    const callDiscriptor = loginSaga.next().value;
    const url = `/api/auth/login?email=${fixture.email}&password=${fixture.password}`;
    const options = {
      method: 'POST',
    };

    expect(callDiscriptor).toEqual(call(request, url, options));
  });

  it('should dispatch put saga and call successApi() with the return api response', () => {
    const responseFixture = true;
    const putDiscriptor = loginSaga.next(responseFixture).value;

    expect(putDiscriptor).toEqual(put(successApi(responseFixture)));
  });

  it('should dispatch put saga and catch the error response if the request fails', () => {
    const err = new Error('some error');
    const putDiscriptor = loginSaga.throw(err).value;

    expect(putDiscriptor).toEqual(put(errorApi(err)));
  });
});

describe('authentication saga', () => {
  const authenticationSaga = authentication();
  const mockedTask = createMockTask();

  it('should start a task to watch for SUBMIT_CREDENTIALS action type', () => {
    const takeLatestDiscriptor = authenticationSaga.next().value;
    expect(takeLatestDiscriptor).toEqual(takeLatest(SUBMIT_CREDENTIALS, login));
  });

  it('should yield until LOCATION_CHANGE action dispatch', () => {
    const takeDiscriptor = authenticationSaga.next(mockedTask).value;
    expect(takeDiscriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the watch task when LOCATION_CHANGE happens', () => {
    const cancelDiscriptor = authenticationSaga.next().value;
    expect(cancelDiscriptor).toEqual(cancel(mockedTask));
  });
});
