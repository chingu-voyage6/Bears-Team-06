import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  // UPDATE_AVATAR_REQUEST,
  // UPDATE_AVATAR_SUCCESS,
} from './types';

const initialState = {
  user: null,
  error: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state };
    case GET_USER_SUCCESS:
      return {
        error: '',
        user: action.payload.user,
      };
    case GET_USER_ERROR:
      return {
        error: action.payload.error,
        user: null,
      };
    default:
      return { ...state };
  }
};

export default reducer;
