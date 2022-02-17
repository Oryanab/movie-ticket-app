// Imports
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import Movie from '../../schemas/moviesSchema';
import { Movies } from '../../types/types';

// cant add movie with the same name
export const movieNameValidator = async (_req: Request, res: Response, next: NextFunction) => {
  const currentMovie: Movies = await Movie.findOne({ movie_title: _req.body.movie_title });
  if (
    currentMovie &&
    currentMovie.time_start === _req.body.time_start &&
    currentMovie.movie_date === _req.body.movie_date
  ) {
    res.status(403).json({ statusCode: 401, message: 'This movie is exists in our database' });
  } else {
    next();
  }
};
