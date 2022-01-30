// Imports
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import Movie from '../../schemas/moviesSchema';

// cant add movie with the same name
export const movieNameValidator = async (_req: Request, res: Response, next: NextFunction) => {
  if (await Movie.findOne({ movie_title: _req.body.movie_title })) {
    res.status(403).json({ statusCode: 401, message: 'This movie is exists in our database' });
  } else {
    next();
  }
};
