export interface Movies {
  movieId: string;
  movie_title: string;
  img: string;
  trailer: string;
  genres: Array<string>;
  description: string;
  price: number;
  movie_date: Date;
  time_start: string;
  available_sits: Array<string>;
  taken_sits: Array<string>;
}

export enum moviesReducerActionTypes {
  GET_MOVIES_LIST = 'GET_MOVIES_LIST',
  GET_SINGLE_MOVIE = 'GET_SINGLE_MOVIE',
}

export interface getMoviesAction {
  type: moviesReducerActionTypes.GET_MOVIES_LIST;
  payload: Movies[];
}

export interface getSingleMovieAction {
  type: moviesReducerActionTypes.GET_SINGLE_MOVIE;
  payload: Movies;
}

export type moviesReducerActions = getMoviesAction | getSingleMovieAction;
