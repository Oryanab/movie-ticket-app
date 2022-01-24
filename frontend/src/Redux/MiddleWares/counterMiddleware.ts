import { Middleware } from 'redux';

export const isNumber: Middleware = store => next => action => {
  if (action.shouldConfirm) {
    if (confirm(`are you sure you want to ${action.type} by ${action.payload}?`)) {
      next(action);
    }
  } else {
    next(action);
  }
};
