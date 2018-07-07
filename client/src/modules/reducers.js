import { combineReducers } from 'redux';

import userReducer, { SIGN_OUT } from 'modules/user';
import uiReducer from 'modules/ui';

const appReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
