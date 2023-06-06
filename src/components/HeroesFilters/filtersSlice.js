import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    filtersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersChanged,
} = filtersSlice.actions;

export default filtersSlice.reducer;