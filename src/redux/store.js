import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/HeroesList/heroesSlice';
import filters from '../components/HeroesFilters/filtersSlice';

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { heroes: heroes, filters: filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
