import { CounterReducerActions, CounterReducerActionTypes } from '../Types/counterReducerTypes';
const initState = 0;

const counterReducer = (state: number = initState, action: CounterReducerActions) => {
  switch (action.type) {
    case CounterReducerActionTypes.INCREMENT:
      return state + action.payload;
    case CounterReducerActionTypes.DECREMENT:
      return state - action.payload;
    default:
      return state;
  }
};

export default counterReducer;
