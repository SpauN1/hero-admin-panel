import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from '../../components/HeroesFilters/filtersSlice';

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};
