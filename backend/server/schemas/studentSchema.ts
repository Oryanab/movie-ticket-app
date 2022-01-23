import mongoose, { Schema } from 'mongoose';
import { Students } from '../types/types';

const studentSchema: mongoose.Schema = new Schema<Students>({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
});

const Student = mongoose.model('student', studentSchema);

export default Student;
