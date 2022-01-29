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

export const mailVerificationContent = (verificationKey: string, full_name: string): VerificationEmail => {
  const verificationMailContent: VerificationEmail = {
    subject: `Dear ${full_name}, Here is your verification code`,
    text: `Here is your verification code please copy and paste it in the instructed field,\n
     hurry up, it will only be valid for the next 10 minutes. \n
     verification key: ${verificationKey}`,
  };

  return verificationMailContent;
};
