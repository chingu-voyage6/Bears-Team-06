import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';

import sagas from 'modules/sagas';
import reducers from 'modules/reducers';

import { getItem, setItem } from 'utilities/localStorage';

//* Middlewares
const sagaMiddleware = createSagaMiddleware();
const enhancers = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

//* Get persisted state
const persistedState = getItem('state');

//* Create store
const store = createStore(reducers, persistedState, enhancers);
sagaMiddleware.run(sagas);

//* Persist
store.subscribe(
  throttle(() => {
    const { user } = store.getState();

    if (user.authenticated) {
      setItem('state', { user });
    }
  }, 1000),
);

export default store;
