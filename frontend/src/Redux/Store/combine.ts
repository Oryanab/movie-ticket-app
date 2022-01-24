import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from '../Reducers/counterReducer';
import studentsReducer from '../Reducers/studentsReducer';
import { isNumber } from '../MiddleWares/counterMiddleware';
export const appReducers = combineReducers({
  counter: counterReducer,
  students: studentsReducer,
});

const store = createStore(appReducers, {}, applyMiddleware(thunk, isNumber));

export default store;
