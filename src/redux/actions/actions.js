import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from '../../components/HeroesList/heroesSlice';
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from '../../components/HeroesFilters/filtersSlice';

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};
