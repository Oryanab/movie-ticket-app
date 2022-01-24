import { Middleware } from 'redux';

export const isNumber: Middleware = store => next => action => {
  if (action.shouldConfirm) {
    if (confirm('are you sure?')) {
      next(action);
    }
  } else {
    next(action);
  }
};
