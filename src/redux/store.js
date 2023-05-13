import { legacy_createStore, combineReducers } from 'redux';

import heroes from './reducers/heroes';
import filters from './reducers/filter';

const store = legacy_createStore(
  combineReducers({ heroes: heroes, filters: filters }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
