export enum CounterReducerActionTypes {
  INCREMENT = 'Increment',
  DECREMENT = 'Decrement',
}

export interface IncrementAction {
  type: CounterReducerActionTypes.INCREMENT;
  payload: number;
}

export interface DecrementAction {
  type: CounterReducerActionTypes.DECREMENT;
  payload: number;
}

export type CounterReducerActions = IncrementAction | DecrementAction;
