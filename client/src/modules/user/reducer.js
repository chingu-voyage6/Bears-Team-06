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
    case TYPES.SIGN_UP_SUCCESS:
      const payload = action.payload;
      return {
        authenticated: true,
        role: (payload && payload.role) || 'user',
        user: payload
      };
    default:
      return state;
  }
};

export default reducer;
