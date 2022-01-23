import express from 'express';
import cors from 'cors';
require('dotenv').config();
import mongoose from 'mongoose';
import Student from '../schemas/studentSchema';
import { Students } from '../types/types';
import { middlewareServerError, middlewarePageNotFound } from '../api/middlewares/errorhandlers';
const PORT = 4000;

// start app
const app = express();
app.use(express.json());
app.use(cors());
app.use(middlewareServerError);
app.use(middlewarePageNotFound);

// Connect to Db
mongoose
  .connect(process.env.MONGOURI!)
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
