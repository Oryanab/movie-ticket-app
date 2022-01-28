// Imports
import * as nodemailer from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

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
