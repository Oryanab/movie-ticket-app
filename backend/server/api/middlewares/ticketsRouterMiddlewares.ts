// Imports
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { checkExpirationDate, checkNumbersAndLengths, arrayUniquenessChecker } from '../utils/tickets-route-utils';
import Movie from '../../schemas/moviesSchema';
import Ticket from '../../schemas/ticketsSchema';
import { Tickets } from '../../types/types';

// Middleware function for Tickets Route
export const verificationKeyVerify = (_req: Request, res: Response, next: NextFunction) => {
  //const { verificationKey } = _req.body;
  const authHeader: string = _req.headers['authorization']!;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    res.sendStatus(404).json({ message: 'Error, token is not provided' });
  } else {
    try {
      const decodedVerificationKey = jwt.verify(token, process.env.SECRET!) as jwt.JwtPayload;
      if (
        decodedVerificationKey.email === _req.body.email &&
        decodedVerificationKey['full_name'] === _req.body['full_name']
      ) {
        _req.process_token = token;
        _req.verified = true;
        next();
      } else {
        res.status(403).json({ status: 403, message: 'your token may have been expired, please try again' });
      }
    } catch (err) {
      res.status(403).json({ status: 403, message: 'your token is invalid, please try again' });
    }
  }
};

// Verify user valid email
export const validateEmail = (_req: Request, res: Response, next: NextFunction) => {
  _req.body.email.match(
    /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i
  )
    ? next()
    : res.status(403).json({ message: 'this email is invalid' });
};

// Verify user valid age
export const validateAge = (_req: Request, res: Response, next: NextFunction) => {
  _req.body.age >= 18
    ? next()
    : res.status(403).json({ message: 'You may only purchase tickets if you are 18 years old or above' });
};

// Verify user valid Credit card
export const validateCreditCardDetails = (_req: Request, res: Response, next: NextFunction) => {
  const { card_number, card_expiration_date, national_id, ccv } = _req.body;
  if (
    checkNumbersAndLengths(card_number, 16) &&
    checkExpirationDate(new Date(card_expiration_date), new Date()) &&
    checkNumbersAndLengths(national_id, 9) &&
    checkNumbersAndLengths(ccv, 3)
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Invalid Card Details' });
  }
};

// Check sit availability
export const checkSeatAvailability = async (_req: Request, res: Response, next: NextFunction) => {
  const { seats, movie_id } = _req.body;
  try {
    const currentMovie = await Movie.findOne({ movieId: movie_id });
    console.log(currentMovie);
    arrayUniquenessChecker(currentMovie['available_sits'], seats)
      ? next()
      : res.status(403).json({ message: 'these sit are taken' });
  } catch (err) {
    res.status(500).json({ message: 'internal server error, please comeback later' });
  }
};

// Check if movie Date has passed before let them change

export const checkMovieDateCompareToOrder = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const currentTicket: Tickets = await Ticket.findOne({ secret_key: _req.body.orderId });
    console.log(currentTicket);

    checkExpirationDate(currentTicket.movie_date, currentTicket.purchase_date)
      ? next()
      : res.status(403).json({ message: 'this action is no longer available' });
  } catch (err) {
    res.status(500).json({ message: 'internal server error, please comeback later' });
  }
};
