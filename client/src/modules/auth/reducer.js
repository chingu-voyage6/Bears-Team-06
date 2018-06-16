import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
} from './types';

const initialState = {
  requesting: false,
  successful: false,
  authenticated: false,
  error: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
      return {
        requesting: true,
        successful: false,
        authenticated: false,
        error: '',
      };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        requesting: false,
        successful: true,
        authenticated: true,
        error: '',
      };
    case SIGN_OUT:
      return {
        requesting: false,
        successful: true,
        authenticated: false,
        error: '',
      };
    case AUTH_ERROR:
      return {
        requesting: false,
        successful: false,
        authenticated: false,
        error: action.payload.error,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return { ...state };
  }
};

export default reducer;
