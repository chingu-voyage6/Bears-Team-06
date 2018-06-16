import { call, put, takeLatest } from 'redux-saga/effects';

import { SERVER_URI } from 'config';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, AUTH_ERROR } from '../types';
import { postAPI } from 'modules/helpers';
import { SIGN_IN } from 'routes';
import history from 'routes/history';

function* signUp(action) {
  try {
    const {
      payload: { username, email, password },
    } = action;

    const token = yield call(postAPI, `${SERVER_URI}/auth/local/signup`, {
      username,
      email,
      password,
    });

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: token,
    });

    history.push(SIGN_IN);
  } catch (error) {
    // TODO: Gotta change from AUTH_ERROR to SIGN_IN_ERROR
    yield put({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
}

function* signUpWatcher() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default signUpWatcher;
