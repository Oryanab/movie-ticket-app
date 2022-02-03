import { ticketsReducerActions, Tickets, ticketsReducerActionTypes } from '../Types/ticketsReducerTypes';
const initState: Tickets[] = [];
const ticketsListReducer = (state: Tickets[] = initState, action: ticketsReducerActions) => {
  switch (action.type) {
    case ticketsReducerActionTypes.GET_TICKETS_LIST:
      return (state = action.payload);
    default:
      return state;
  }
};

export default ticketsListReducer;
