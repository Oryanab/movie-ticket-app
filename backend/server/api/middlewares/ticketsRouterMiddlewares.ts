// Imports
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { checkExpirationDate, checkNumbersAndLengths } from '../utils/tickets-route-utils';

// Middleware function for Tickets Route
export const verificationKeyVerify = (_req: Request, res: Response, next: NextFunction) => {
  const { verificationKey } = _req.body;
  try {
    const decodedVerificationKey = jwt.verify(verificationKey, process.env.SECRET!) as jwt.JwtPayload;
    const currentUser = decodedVerificationKey.user;
    if (currentUser.email === _req.body.email && currentUser['full_name'] === _req.body['full_name']) {
      _req.process_token = verificationKey;
      next();
    } else {
      res.status(403).json({ status: 403, message: 'your token may have been expired, please try again' });
    }
  } catch (err) {
    res.status(403).json({ status: 403, message: 'your token is invalid, please try again' });
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

// // Verify user valid age
// export const validateAge = (_req: Request, res: Response, next: NextFunction) => {
//   _req.body.age >= 18
//     ? next()
//     : res.status(403).json({ message: 'You may only purchase tickets if you are 18 years old or above' });
// };

// Verify user valid Credit card
export const validateCreditCardDetails = (_req: Request, res: Response, next: NextFunction) => {
  const { card_number, card_expiration_date, national_id, ccv } = _req.body;
  if (
    checkNumbersAndLengths(card_number, 16) &&
    checkExpirationDate(card_expiration_date) &&
    checkNumbersAndLengths(national_id, 9) &&
    checkNumbersAndLengths(ccv, 3)
  ) {
    next();
  } else {
    res.status(403).json({ message: 'Invalid Card Details' });
  }
};
