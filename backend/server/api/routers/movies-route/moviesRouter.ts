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
router.get('/', async (_req: express.Request, res: express.Response) => {
  try {
    const allMovies: Movies[] = await Movie.find();
    res.status(200).json({ statusCode: 200, message: allMovies });
  } catch (err) {
    res.status(401).json({ statusCode: 500, message: 'failed to load tickets' });
  }
});

router.post('/add-movie', movieNameValidator, async (_req: express.Request, res: express.Response) => {
  try {
    const { movie_title, img, trailer, ganres, description, price, movie_date, time_start } = _req.body;
    await Movie.insertMany({
      id: secretId(),
      movie_title,
      img,
      trailer,
      ganres,
      description,
      price,
      movie_date,
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
router.get('/single-movie', async (_req: express.Request, res: express.Response) => {
  try {
    const currentMovie = await Movie.findOne({ id: _req.body.id });
    res.status(200).json({ statusCode: 200, currentMovie });
  } catch (err) {
    res.status(401).json({ statusCode: 404, message: 'could not find movie' });
  }
});

// Remove movie
router.delete('/delete-movie', async (_req: express.Request, res: express.Response) => {
  try {
    const currentMovie = await Movie.findOneAndDelete({ id: _req.body.id });
    res.status(200).json({ statusCode: 200, message: `${currentMovie['movie_title']} was removed successfully` });
  } catch (err) {
    res.status(401).json({ statusCode: 404, message: 'could not find movie' });
  }
});
