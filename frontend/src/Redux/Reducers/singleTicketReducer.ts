import { ticketsReducerActions, Tickets, ticketsReducerActionTypes } from '../Types/ticketsReducerTypes';
const singleTicketReducer = (state: Tickets, action: ticketsReducerActions) => {
  switch (action.type) {
    case ticketsReducerActionTypes.GET_SINGLE_TICKET:
      return (state = action.payload);
    default:
      return state;
  }
};

export default singleTicketReducer;
