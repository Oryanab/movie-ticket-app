import { moviesReducerActions, Movies, moviesReducerActionTypes } from '../Types/moviesReducerTypes';
const initState = {
  movieId: 'undefined',
  movie_title: 'undefined',
  img: 'undefined',
  trailer: 'undefined',
  genres: ['undefined'],
  description: 'undefined',
  price: 0,
  movie_date: new Date(),
  time_start: 'undefined',
  available_sits: ['undefined'],
  taken_sits: ['undefined'],
};

const singleMovieReducer = (state: Movies = initState, action: moviesReducerActions) => {
  switch (action.type) {
    case moviesReducerActionTypes.GET_SINGLE_MOVIE:
      return (state = action.payload);
    default:
      return state;
  }
};

export default singleMovieReducer;
