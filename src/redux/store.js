import { legacy_createStore, combineReducers } from 'redux';

import heroes from './reducers/heroes';
import filters from './reducers/filters';

const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === 'string') {
        return oldDispatch({
          type: action,
        });
      }
      return oldDispatch(action);
    };
    return store;
  };

const store = legacy_createStore(
  combineReducers({ heroes: heroes, filters: filters }), enhancer
);

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
