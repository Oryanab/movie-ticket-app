import { moviesReducerActions, moviesReducerActionTypes } from '../Types/moviesReducerTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

export const getSingleMovie = (movieId: string) => async (dispatch: Dispatch<moviesReducerActions>) => {
  const getUrl = `http://localhost:4000/api/movies/details/${movieId}`;
  const response = await axios.get(getUrl);
  dispatch({ type: moviesReducerActionTypes.GET_SINGLE_MOVIE, payload: response.data });
};
