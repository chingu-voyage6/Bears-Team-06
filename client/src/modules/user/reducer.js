import { handleActions } from 'redux-actions';
import * as TYPES from './types';

//* Initial State
const initialState = {
  user: null,
  authenticated: false,
  role: 'guest',
};

//* Reducers
const reducer = handleActions(
  {
    [TYPES.SIGN_IN_SUCCESS]: (state, { user }) => ({
      authenticated: true,
      role: (user && user.role) || 'user',
      user,
    }),
  },
  initialState,
);

export default reducer;
