import {
  GET_USER_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_AVATAR_REQUEST,
} from './types';

const getUser = token => ({
  type: GET_USER_REQUEST,
  payload: {
    token,
  },
});

const updateUser = user => ({
  type: UPDATE_USER_REQUEST,
  payload: {
    user,
  },
});

const updateAvatar = avatar => ({
  type: UPDATE_AVATAR_REQUEST,
  payload: {
    avatar,
  },
});

export { getUser, updateUser, updateAvatar };
