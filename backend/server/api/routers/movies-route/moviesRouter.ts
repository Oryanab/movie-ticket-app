import express, { Router } from 'express';
require('dotenv').config();
import Movie from '../../../schemas/moviesSchema';
import { Movies } from '../../../types/types';
import { v4 as secretId } from 'uuid';
import { returnAvailableSeats } from '../../utils/movie-route-utils';
import { movieNameValidator } from '../../middlewares/moviesRouterMiddleware';

// Start Router
const router: Router = express.Router();

// Routes
router.get('/get-movies', async (_req: express.Request, res: express.Response) => {
  try {
    const allMovies: Movies[] = await Movie.find();
    res.status(200).json({ statusCode: 200, message: allMovies });
  } catch (err) {
    res.status(401).json({ statusCode: 500, message: 'failed to load tickets' });
  }
});

router.post('/add-movie', movieNameValidator, async (_req: express.Request, res: express.Response) => {
  try {
    const { movie_title, img, trailer, genres, description, price, movie_date, time_start } = _req.body;
    await Movie.insertMany({
      movieId: secretId(),
      movie_title,
      img,
      trailer,
      genres,
      description,
      price,
      movie_date: new Date(movie_date),
      time_start,
      available_sits: returnAvailableSeats(),
      taken_sits: [],
    });
    res.status(200).json({ statusCode: 200, message: 'Movie was added successfully' });
  } catch (err) {
    res.status(401).json({ statusCode: 400, message: 'failed to add new Movie' });
  }
});

// Get single Movie
router.get('/details/:movieid', async (_req: express.Request, res: express.Response) => {
  try {
    const currentMovie: Movies = await Movie.findOne({ movieId: _req.params.movieid });
    res.status(200).json({ statusCode: 200, currentMovie });
  } catch (err) {
    res.status(401).json({ statusCode: 404, message: 'could not find movie' });
  }
});

// Remove movie
router.delete('/delete-movie/:movieId', async (_req: express.Request, res: express.Response) => {
  try {
    const currentMovie = await Movie.findOneAndDelete({ movieId: _req.params.movieId });
    res.status(200).json({ statusCode: 200, message: `${currentMovie['movie_title']} was removed successfully` });
  } catch (err) {
    res.status(401).json({ statusCode: 404, message: 'could not find movie' });
  }
});

export default router;
