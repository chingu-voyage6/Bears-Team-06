import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import reducers from 'modules/reducers';
import { getItem, setItem } from 'utilities/localStorage';

//* Middlewares
const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

//* Get persisted state
const persistedState = getItem('state');

//* Create store
const store = createStore(reducers, persistedState, enhancers);

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
