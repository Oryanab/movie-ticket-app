export interface Tickets {
  full_name: String;
  secret_key: String;
  movie_id: String;
  email: String;
  movie_title: String;
  seats: Array<string>;
  price: Number;
  movie_date: Date;
  time_start: String;
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
