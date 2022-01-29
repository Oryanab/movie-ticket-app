import { v4 as secretId } from 'uuid';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const generateSecretKey = (): string => {
  return secretId();
};

export const generateVerificationKey = (full_name: string, email: string) => {
  const accessToken = jwt.sign({ full_name, email }, process.env.SECRET!, {
    expiresIn: '5m',
  });
  return accessToken;
};
