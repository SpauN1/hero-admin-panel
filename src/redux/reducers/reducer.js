const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'HERO_CREATED':
      let newCreatedHeroList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newCreatedHeroList,
        filteredHeroes:
          state.activeFilter === 'all'
            ? newCreatedHeroList
            : newCreatedHeroList.filter(
                (item) => item.element === state.activeFilter
              ),
      };
    case 'HERO_DELETED':
      const newHeroList = state.heroes.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes:
          state.activeFilter === 'all'
            ? newHeroList
            : newHeroList.filter((item) => item.element === state.activeFilter),
      };
    default:
      return state;
  }
};

export default reducer;
