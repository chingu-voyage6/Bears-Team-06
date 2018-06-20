import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { userSaga } from './user';
import { uploadSaga } from './upload';

export default function* sagas() {
  yield all([authSaga(), userSaga(), uploadSaga()]);
}
