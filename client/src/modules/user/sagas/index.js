import { all } from 'redux-saga/effects';

import signInWatcher from './signIn';
// import signUpWatcher from './signUp';
// import signOutWatcher from './signOut';

export function* userSaga() {
  yield all([signInWatcher()]);
}
