import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from '../Reducers/counterReducer';
import studentsReducer from '../Reducers/studentsReducer';

export const appReducers = combineReducers({
  counter: counterReducer,
  students: studentsReducer,
});

const store = createStore(appReducers, {}, applyMiddleware(thunk));

export default store;
