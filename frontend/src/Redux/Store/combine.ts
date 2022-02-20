import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Movie App:
import moviesListReducer from '../Reducers/moviesReducer';
import singleMovieReducer from '../Reducers/singleMovieReducer';
import ticketsListReducer from '../Reducers/ticketsReducer';
import singleTicketReducer from '../Reducers/singleTicketReducer';

export const appReducers = combineReducers({
  moviesList: moviesListReducer,
  singleMovieR: singleMovieReducer,
  ticketsList: ticketsListReducer,
  singleTicketR: singleTicketReducer,
});

const store = createStore(appReducers, {}, applyMiddleware(thunk));

export default store;
