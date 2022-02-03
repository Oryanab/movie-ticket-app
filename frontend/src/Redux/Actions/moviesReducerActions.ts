import { moviesReducerActions, moviesReducerActionTypes } from '../Types/moviesReducerTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

export const getMoviesList = () => async (dispatch: Dispatch<moviesReducerActions>) => {
  const getUrl = 'http://localhost:4000/api/movies/get-movies';
  const response = await axios.get(getUrl);
  dispatch({ type: moviesReducerActionTypes.GET_MOVIES_LIST, payload: response.data });
};
