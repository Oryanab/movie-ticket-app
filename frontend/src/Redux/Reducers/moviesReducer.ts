import { moviesReducerActions, Movies, moviesReducerActionTypes } from '../Types/moviesReducerTypes';
const initState: Movies[] = [];
const moviesListReducer = (state: Movies[] = initState, action: moviesReducerActions) => {
  switch (action.type) {
    case moviesReducerActionTypes.GET_MOVIES_LIST:
      return (state = action.payload);
    default:
      return state;
  }
};

export default moviesListReducer;
