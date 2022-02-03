export interface Tickets {
  full_name: string;
  secret_key: string;
  movie_id: string;
  email: string;
  movie_title: string;
  seats: Array<string>;
  price: number;
  movie_date: Date;
  time_start: string;
  purchase_date: Date;
}

export enum ticketsReducerActionTypes {
  GET_TICKETS_LIST = 'GET_TICKETS_LIST',
  GET_SINGLE_TICKET = 'GET_SINGLE_TICKET',
}

export interface getTicketsAction {
  type: ticketsReducerActionTypes.GET_TICKETS_LIST;
  payload: Tickets[];
}

export interface getSingleTicketAction {
  type: ticketsReducerActionTypes.GET_SINGLE_TICKET;
  payload: Tickets;
}

export type ticketsReducerActions = getTicketsAction | getSingleTicketAction;
