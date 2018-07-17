import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

const reducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
});

export default reducer;
