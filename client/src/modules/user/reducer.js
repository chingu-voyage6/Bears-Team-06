import * as TYPES from './types';

//* Initial State
const initialState = {
  user: null,
  authenticated: false,
  role: 'guest',
};

//* Reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SIGN_IN_SUCCESS:
      const user = action.payload.user;
      return {
        authenticated: true,
        role: (user && user.role) || 'user',
        profile: user,
      };
    case TYPES.SIGN_UP_SUCCESS:
      const userOne = action.payload.userOne;
      return {
        authenticated: true,
        role: (userOne && userOne.role) || 'user',
        profile: userOne,
    };
    default:
      return state;
  }
};

export default reducer;
