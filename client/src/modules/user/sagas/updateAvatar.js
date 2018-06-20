import { call, put, take, select, takeLatest } from 'redux-saga/effects';

import { SERVER_URI } from 'config';
import { postAPI } from 'modules/helpers';
import {
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_ERROR,
  UPDATE_AVATAR_SUCCESS,
} from '../types';
import { uploadFile, UPLOAD_FILE_SUCCESS } from 'modules/upload';

function* updateAvatar({ payload }) {
  try {
    const { avatar } = payload;

    //* Upload profile image
    yield put(uploadFile(avatar));
    yield take(UPLOAD_FILE_SUCCESS);

    const file = yield select(state => state.upload.file);
    const { url, key } = file;
    yield call(postAPI, `${SERVER_URI}/user/updateAvatar`, key);
    yield put({
      type: UPDATE_AVATAR_SUCCESS,
      payload: {
        url,
      },
    });
  } catch (error) {
    yield put({
      type: UPDATE_AVATAR_ERROR,
      payload: {
        error: error.message,
      },
    });
  }
}

function* updateAvatarWatcher() {
  yield takeLatest(UPDATE_AVATAR_REQUEST, updateAvatar);
}

export default updateAvatarWatcher;
