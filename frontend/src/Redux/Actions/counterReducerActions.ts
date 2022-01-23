import { CounterReducerActionTypes } from '../Types/counterReducerTypes';
import { Dispatch } from 'redux';

export const increment = (amount: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CounterReducerActionTypes.INCREMENT,
      payload: amount,
    });
  };
};

export const decrement = (amount: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CounterReducerActionTypes.INCREMENT,
      payload: amount,
    });
  };
};
