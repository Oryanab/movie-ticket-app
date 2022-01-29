import express from 'express';
import cors from 'cors';
require('dotenv').config();
import mongoose from 'mongoose';
import Student from '../schemas/studentSchema';
import { Students } from '../types/types';
import { middlewareServerError, middlewarePageNotFound } from './middlewares/errorhandlers';
const PORT = process.env.PORT || 4000;
import ticketsRouter from './routers/tickets-route/ticketsRouter';

// Start App
const app = express();
app.use(express.json());
app.use(cors());
app.use(middlewareServerError);
app.use(middlewarePageNotFound);
app.use('/api/tickets', ticketsRouter);

// Connect to MongoDb
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('connected');
  })
  .catch(error => {
    console.log(error);
  });

app.get('/get', async (_req: express.Request, res: express.Response) => {
  try {
    const allStudents: Students[] = await Student.find();
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(401).json({ message: 'failed' });
  }
});

app.post('/post', async (_req: express.Request, res: express.Response) => {
  try {
    const { name, gender, age, dateOfBirth, address } = _req.body;
    const newStudent = await Student.insertMany({
      name,
      gender,
      age,
      dateOfBirth: new Date(dateOfBirth),
      address,
    });
    res.status(200).json(newStudent);
  } catch (err) {
    res.status(401).json({ message: 'failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
