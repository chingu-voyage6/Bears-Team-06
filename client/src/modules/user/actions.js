import axios from 'axios';
import * as TYPES from './types';
import SERVER_URI from 'config/server';

const signIn = ({ email, password }) => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: TYPES.SIGN_IN_REQUEST });

    try {
      const response = await axios.post(`${SERVER_URI}/auth/signin`, {
        email,
        password,
      });

      dispatch({
        type: TYPES.SIGN_IN_SUCCESS,
        payload: {
          user: response,
        },
      });

      resolve();
    } catch (error) {
      dispatch({
        type: TYPES.SIGN_IN_FAILURE,
        error: true,
        payload: {
          message: error.response.data.message,
        },
      });

      reject();
    }
  });
};

export { signIn };
