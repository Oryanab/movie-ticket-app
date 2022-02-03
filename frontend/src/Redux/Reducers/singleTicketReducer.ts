import { ticketsReducerActions, Tickets, ticketsReducerActionTypes } from '../Types/ticketsReducerTypes';

const initState = {
  full_name: 'undefined',
  secret_key: 'undefined',
  movie_id: 'undefined',
  email: 'undefined',
  movie_title: 'undefined',
  seats: ['undefined'],
  price: 0,
  movie_date: new Date(),
  time_start: 'undefined',
  purchase_date: new Date(),
};

const singleTicketReducer = (state: Tickets = initState, action: ticketsReducerActions) => {
  switch (action.type) {
    case ticketsReducerActionTypes.GET_SINGLE_TICKET:
      return (state = action.payload);
    default:
      return state;
  }
};

export default singleTicketReducer;
