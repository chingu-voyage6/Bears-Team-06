import { takeLatest, call, put, take } from 'redux-saga/effects';

import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SOCIAL_SIGN_IN,
  AUTH_ERROR,
} from '../types';
import { SERVER_URI } from 'config';
import { getUser, GET_USER_SUCCESS } from 'modules/user';
import { setItem } from 'lib';
import { postAPI } from 'modules/helpers';
import history from 'routes/history';

function* callGetUser() {
  //* Get user
  yield put(getUser());
  yield take(GET_USER_SUCCESS);

  yield put({
    type: SIGN_IN_SUCCESS,
  });

  history.push('/');
}

function* socialSignIn(action) {
  const {
    payload: { token },
  } = action;

  yield call(callGetUser, token);
}

function* signIn(action) {
  try {
    const {
      payload: { username, password },
    } = action;

    //* Sign in
    const response = yield call(postAPI, `${SERVER_URI}/auth/local/signin`, {
      username,
      password,
    });

    //* Save token to localStorage
    const token = response.data.token;
    setItem('accessToken', token);

    yield call(callGetUser, token);
  } catch (error) {
    // TODO: Gotta change from AUTH_ERROR to SIGN_IN_ERROR
    yield put({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
}

function* signInWatcher() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
  yield takeLatest(SOCIAL_SIGN_IN, socialSignIn);
}

export default signInWatcher;
