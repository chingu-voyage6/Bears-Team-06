import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
} from '../types';
import { SERVER_URI, BUCKET_NAME } from 'config';
import { getAPI } from 'modules/helpers';

function uploadToS3(url, file) {
  return axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
}

function* uploadFile({ payload }) {
  try {
    //* Get presigned signature
    const response = yield call(getAPI, `${SERVER_URI}/upload`, true);
    const { url, key } = response.data; // url is presigned signature url

    //* Upload to S3
    const { file } = payload;
    console.log(file);
    yield call(uploadToS3, url, file);

    const fileURL = `https://s3.amazonaws.com/${BUCKET_NAME}/${key}`;
    /**
     * We now have the key (file name)
     * We can either save it or the actual fileURL to our database
     * And we can do whatever we wanna with the url
     */

    yield put({
      type: UPLOAD_FILE_SUCCESS,
      payload: { url: fileURL, key },
    });
  } catch (error) {
    yield put({
      type: UPLOAD_FILE_ERROR,
      payload: error.response.data,
    });
  }
}

function* uploadFileWatcher() {
  yield takeLatest(UPLOAD_FILE_REQUEST, uploadFile);
}

export default uploadFileWatcher;
