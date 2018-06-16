import { all } from 'redux-saga/effects';

import uploadFileWatcher from './uploadFile';

export function* uploadSaga() {
  yield all([uploadFileWatcher()]);
}
