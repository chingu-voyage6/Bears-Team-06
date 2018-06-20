import { call, put, takeLatest } from 'redux-saga/effects';

import { SERVER_URI } from 'config';
import { GET_USER_REQUEST, GET_USER_ERROR, GET_USER_SUCCESS } from '../types';
import { getAPI } from 'modules/helpers';
import { setItem } from 'lib';

function* getUser() {
  try {
    const response = yield call(getAPI, `${SERVER_URI}/user/current`, true);
    const user = response.data.user;

    //* Save user to local storage
    setItem('user', user);

    yield put({
      type: GET_USER_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    yield put({
      type: GET_USER_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
}

function* getUserWatcher() {
  yield takeLatest(GET_USER_REQUEST, getUser);
}

export default getUserWatcher;
