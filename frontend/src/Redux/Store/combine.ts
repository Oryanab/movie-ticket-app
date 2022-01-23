import { combineReducers } from 'redux';
import counterReducer from '../Reducers/counterReducer';

const appReducers = combineReducers({
  counter: counterReducer,
});

export default appReducers;
