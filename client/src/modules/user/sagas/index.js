import { all } from 'redux-saga/effects';

import getUserWatcher from './getUser';
import updateAvatarWatcher from './updateAvatar';

export function* userSaga() {
  yield all([getUserWatcher(), updateAvatarWatcher()]);
}
