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

// export const generateActionKey = (full_name: string, email: string, verified: boolean) => {
//   const accessToken = jwt.sign({ full_name, email, verified }, process.env.SECRET!, {
//     expiresIn: '10m',
//   });
//   return accessToken;
// };

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
export const checkExpirationDate = (card_expiration_date: Date, maxDate: Date) => {
  let diff = maxDate.getTime() - card_expiration_date.getTime();
  if (diff < 0) {
    return true;
  } else {
    return false;
  }
};

// Check Card/National Id/CCV are numbers and length
export const checkNumbersAndLengths = (numberString: string, length: number) => {
  const numberStringComprehension = [];
  for (let char of numberString) {
    if (Number(char)) {
      numberStringComprehension.push(char);
    }
  }
  if (numberStringComprehension.length == length) return true;
  else return false;
};

checkNumbersAndLengths('ccv', 3);

// Check if Array Include Another Array
export const arrayUniquenessChecker = (arr: Array<any>, target: Array<any>): boolean => {
  return target.every(v => arr.includes(v));
};
