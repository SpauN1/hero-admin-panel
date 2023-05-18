import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';

import heroes from './reducers/heroes';
import filters from './reducers/filters';

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = legacy_createStore(
  combineReducers({ heroes: heroes, filters: filters }),
  // applyMiddleware(stringMiddleware)
  // Подключаем DevTools
  compose(
    applyMiddleware(stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

// Store Enhancers

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === 'string') {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

// const store = legacy_createStore(
//   combineReducers({ heroes: heroes, filters: filters }),
//   compose(
//     enhancer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
