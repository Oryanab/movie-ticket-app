import mongoose, { Schema } from 'mongoose';
import { Tickets } from '../types/types';

const ticketsSchema: mongoose.Schema = new Schema<Tickets>({
  full_name: { type: String, required: true },
  secret_key: { type: String, required: true },
  movie_id: { type: String, required: true },
  email: { type: String, required: true },
  movie_title: { type: String, required: true },
  sit: { type: String, required: true },
  price: { type: String, required: true },
  movie_date: { type: Date, required: true },
  time_start: { type: String, required: true },
  purchase_date: { type: Date, required: true },
});

const Ticket = mongoose.model('ticket', ticketsSchema);

export default Ticket;
