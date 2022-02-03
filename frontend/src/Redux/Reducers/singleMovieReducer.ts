import { moviesReducerActions, Movies, moviesReducerActionTypes } from '../Types/moviesReducerTypes';
const singleMovieReducer = (state: Movies, action: moviesReducerActions) => {
  switch (action.type) {
    case moviesReducerActionTypes.GET_SINGLE_MOVIE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default singleMovieReducer;
