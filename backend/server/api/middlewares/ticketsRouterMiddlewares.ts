// Imports
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import * as jwt from 'jsonwebtoken';

// Middleware function for Tickets Route
export const verificationKeyVerify = (_req: Request, res: Response, next: NextFunction) => {
  const { verificationKey } = _req.body;
  try {
    const decodedVerificationKey = jwt.verify(verificationKey, process.env.SECRET!) as jwt.JwtPayload;
    const currentUser = decodedVerificationKey.user;
    if (currentUser.email === _req.body.email && currentUser['full_name'] === _req.body['full_name']) {
      _req.verified = true;
      next();
    } else {
      res.status(403).json({ status: 403, message: 'your token may have been expired, please try again' });
    }
  } catch (err) {
    res.status(403).json({ status: 403, message: 'your token is invalid, please try again' });
  }
};
