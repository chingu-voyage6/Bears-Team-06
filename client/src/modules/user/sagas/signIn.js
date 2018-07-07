import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as TYPES from '../types';

function* signIn({ payload: { email, password }, meta: { setSubmitting } }) {
  yield put({ type: TYPES.SIGN_IN_REQUEST });
  yield delay(2000);
  yield call(setSubmitting, false);
  yield put({ type: TYPES.SIGN_IN_SUCCESS });
}

function* signInWatcher() {
  yield takeLatest(TYPES.SIGN_IN, signIn);
}

export default signInWatcher;
