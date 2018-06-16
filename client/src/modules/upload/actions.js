import { UPLOAD_FILE_REQUEST } from './types';

const uploadFile = file => ({
  type: UPLOAD_FILE_REQUEST,
  payload: { file },
});

export { uploadFile };
