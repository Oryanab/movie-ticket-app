import { ticketsReducerActions, ticketsReducerActionTypes } from '../Types/ticketsReducerTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

export const getSingleTicket = (ticketId: string) => async (dispatch: Dispatch<ticketsReducerActions>) => {
  const getUrl = `http://localhost:4000/api/tickets/view-ticket-details/${ticketId}`;
  const response = await axios.get(getUrl);
  dispatch({ type: ticketsReducerActionTypes.GET_SINGLE_TICKET, payload: response.data.message });
};
