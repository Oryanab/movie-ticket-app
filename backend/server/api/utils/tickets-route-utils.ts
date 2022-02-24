import { v4 as secretId } from 'uuid';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import Ticket from '../../schemas/ticketsSchema';

export const generateSecretKey = (): string => {
  return secretId();
};

export const generateVerificationKey = (full_name: string, email: string) => {
  const accessToken = jwt.sign({ full_name, email }, process.env.SECRET!, {
    expiresIn: '10m',
  });
  return accessToken;
};

// Add new ticket
export const AddTicket = async (
  full_name: string,
  secret_key: string,
  movie_id: string,
  email: string,
  movie_title: string,
  seats: Array<string>,
  price: number,
  movie_date: Date,
  time_start: string
) => {
  try {
    await Ticket.insertMany({
      full_name,
      secret_key,
      movie_id,
      email,
      movie_title,
      seats,
      price,
      movie_date: new Date(movie_date),
      time_start,
      purchase_date: new Date(),
    });
    return true;
  } catch (err) {
    return false;
  }
};

// Check Card Expiration Date
export const checkExpirationDate = (movie_date: string, time_start: String) => {
  if (new Date() <= new Date(`${movie_date} ${time_start}`)) {
    return true;
  }
  return false;
};

// Check Card/National Id/CCV are numbers and length
export const checkNumbersAndLengths = (numberString: string, length: number) => {
  const numberStringComprehension = [];
  for (let char of numberString) {
    if (Number(char) || char === '0') {
      numberStringComprehension.push(char);
    }
  }
  if (numberStringComprehension.length === length) return true;
  else return false;
};

// Check if Array Include Another Array
export const arrayUniquenessChecker = (arr: Array<any>, target: Array<any>): boolean => {
  return target.every(v => arr.includes(v));
};

export const userUpdateSeats = async (seats: Array<string>, prevSeats: Array<string>, orderId: string) => {
  await Ticket.findOneAndUpdate({ secret_key: orderId }, { $set: { seats: seats } });
  console.log({ orderId: orderId, 'previous seats': prevSeats, 'updated seats': seats });
};
