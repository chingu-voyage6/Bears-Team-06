import { all } from 'redux-saga/effects';

import { userSaga } from './user';

export default function* sagas() {
  yield all([userSaga()]);
}
