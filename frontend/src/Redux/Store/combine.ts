import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Example:
import counterReducer from '../Reducers/counterReducer';
import studentsReducer from '../Reducers/studentsReducer';
import { isNumber } from '../MiddleWares/counterMiddleware';

// Movie App:
import moviesListReducer from '../Reducers/moviesReducer';
import singleMovieReducer from '../Reducers/singleMovieReducer';
import ticketsListReducer from '../Reducers/ticketsReducer';
import singleTicketReducer from '../Reducers/singleTicketReducer';

export const appReducers = combineReducers({
  counter: counterReducer,
  students: studentsReducer,
  moviesList: moviesListReducer,
  singleMovieR: singleMovieReducer,
  ticketsList: ticketsListReducer,
  singleTicketR: singleTicketReducer,
});

const store = createStore(appReducers, {}, applyMiddleware(thunk, isNumber));

export default store;
