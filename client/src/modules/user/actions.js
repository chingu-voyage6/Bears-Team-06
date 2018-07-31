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
        payload: response.data
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

//SignUp

const signUp = ({ username, email, password }) => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: TYPES.SIGN_UP_REQUEST });

    try {
      const response = await axios.post(`${SERVER_URI}/auth/signup`, {
        email,
        password,
      });

      console.log(response)

      dispatch({
        type: TYPES.SIGN_UP_SUCCESS,
        payload: response.data
      });

      resolve();
    } catch (error) {
      dispatch({
        type: TYPES.SIGN_UP_FAILURE,
        error: true,
        payload: {
          message: error.response.data.message,
        },
      });

      reject();
    }
  });
};

//Add goal
// export function createGoal(values, callback) {
//   const request = axios.post(`${SERVER_URI}/goals${API_KEY}`, values)
//       .then (() => callback());

//   return {
//       type: CREATE_GOAL,
//       payload: request
//   };
// }

export { signIn, signUp };

