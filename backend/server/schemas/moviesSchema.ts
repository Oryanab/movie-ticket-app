import mongoose, { Schema } from 'mongoose';
import { Movies } from '../types/types';

const moviesSchema: mongoose.Schema = new Schema<Movies>({
  id: { type: String, required: true },
  movie_title: { type: String, required: true },
  img: { type: String, required: true },
  trailer: { type: String, required: true },
  genres: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
  description: { type: String, required: true },
  price: { type: String, required: true },
  movie_date: { type: Date, required: true },
  time_start: { type: String, required: true },
  available_sits: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
  taken_sits: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
});

const Movie = mongoose.model('movie', moviesSchema);

export default Movie;
