import axios from 'axios';
import * as TYPES from './types';
import SERVER_URI from 'config/server';
import CREATE_GOAL from 'modules/user';

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
export function createGoal(goal, numberOfDay) {
  console.log(goal, numberOfDay) 
  return {
    type: CREATE_GOAL
  }
}

export { signIn, signUp };

