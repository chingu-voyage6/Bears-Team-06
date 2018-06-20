import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
} from './types';

const initialState = {
  requesting: false,
  successful: false,
  error: '',
  file: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return {
        requesting: true,
        succussful: false,
        error: '',
        file: state.file,
      };
    case UPLOAD_FILE_SUCCESS:
      const { url, key } = action.payload;
      return {
        requesting: false,
        succussful: true,
        error: '',
        file: { url, key },
      };
    case UPLOAD_FILE_ERROR:
      return {
        requesting: false,
        succussful: true,
        error: action.payload.error,
        file: state.file,
      };
    default:
      return state;
  }
};

export default reducer;
