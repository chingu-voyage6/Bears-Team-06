import { all } from 'redux-saga/effects';

import signInWatcher from './signIn';
import signUpWatcher from './signUp';
import signOutWatcher from './signOut';

export function* authSaga() {
  yield all([signInWatcher(), signUpWatcher(), signOutWatcher()]);
}
