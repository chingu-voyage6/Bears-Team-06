import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer, { SIGN_OUT } from 'modules/user';
import uiReducer from 'modules/ui';

const appReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
