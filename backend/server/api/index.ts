import express from 'express';
import cors from 'cors';
require('dotenv').config();
import mongoose from 'mongoose';
import { middlewareServerError, middlewarePageNotFound } from './middlewares/errorhandlers';
const PORT = process.env.PORT || 4000;
import ticketsRouter from './routers/tickets-route/ticketsRouter';
import movieRouter from './routers/movies-route/moviesRouter';

// Start App
const app = express();
app.use(express.json());
app.use(cors());
app.use(middlewareServerError);
app.use(middlewarePageNotFound);
app.use('/api/tickets', ticketsRouter);
app.use('/api/movies', movieRouter);

// Connect to MongoDb
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('connected');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
