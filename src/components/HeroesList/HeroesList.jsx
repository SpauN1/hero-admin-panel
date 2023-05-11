import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
} from '../../redux/actions/actions';
import HeroesListItem from '../HeroesListItem/HeroesListItem';
import Spinner from '../Spinner/Spinner';

const HeroesList = () => {
  const filteredHeroes = useSelector((state) => {
    if (state.activeFilter === 'all') {
      return state.heroes;
    } else {
      return state.heroes.filter((item) => item.element === state.activeFilter);
    }
  });
  const heroesLoadingStatus = useSelector((state) => state.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then((data) => console.log(data, 'Deleted'))
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem {...props} onDelete={() => onDelete(id)} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
