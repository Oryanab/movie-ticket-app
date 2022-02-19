// Imports
import * as nodemailer from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');
import { VerificationEmail } from '../../types/types';

require('dotenv').config();

// Send Email
const connectionEmail = () => {
  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL_ADDR,
      pass: process.env.MY_EMAIL_PASS, // naturally, replace both with your real credentials or an application-specific password
    },
  });
  return transporter;
};

export const sendMailFn = (to: string, subject: string, text: string) => {
  const transporter = connectionEmail();
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MY_EMAIL_ADDR,
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error: Error | null, info: SMTPTransport.SentMessageInfo): any => {
    if (error) {
      return false;
    } else {
      return info;
    }
  });
};

// Verification email
export const mailVerificationContent = (full_name: string, verificationKey: string): VerificationEmail => {
  const verificationMailContent: VerificationEmail = {
    subject: `Dear ${full_name}, Here is your verification code`,
    text: `Here is your verification code please copy and paste it in the instructed field,\n
     hurry up, it will only be valid for the next 10 minutes. \n
     verification key: ${verificationKey}`,
  };
  return verificationMailContent;
};

// Purchase email
export const mailSuccessfulPurchase = (
  full_name: string,
  movie_title: string,
  seats: Array<string>,
  secret_key: string,
  price: number,
  movie_date: Date,
  time_start: string
): VerificationEmail => {
  const SuccessfulPurchaseMailContent: VerificationEmail = {
    subject: `Dear ${full_name}, Here is your order details`,
    text: `Order Details:\n 
    full name: ${full_name}\n 
    movie: ${movie_title}\n 
    date: ${new Date(movie_date).toLocaleDateString()}\n 
    starting time: ${time_start}\n 
    seats: ${seats.toString()}\n
    price: ${price * seats.length}LIS\n 
    Order number: ${secret_key}\n`,
  };
  return SuccessfulPurchaseMailContent;
};

// Cancellation email
export const mailCancellationContent = (full_name: string) => {
  const cancellationMailContent: VerificationEmail = {
    subject: `Dear ${full_name}, Your order was cancelled successfully`,
    text: `Thank you`,
  };
  return cancellationMailContent;
};
