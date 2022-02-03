import { ticketsReducerActions, ticketsReducerActionTypes } from '../Types/ticketsReducerTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

export const getTicketsList = () => async (dispatch: Dispatch<ticketsReducerActions>) => {
  const getUrl = 'http://localhost:4000/api/tickets/view-tickets';
  const response = await axios.get(getUrl);

  dispatch({ type: ticketsReducerActionTypes.GET_TICKETS_LIST, payload: response.data.message });
};
