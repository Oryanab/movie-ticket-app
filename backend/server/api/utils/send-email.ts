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
    html: text,
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
    text: `<div style="background-color: blueviolet; color: white; text-align: center; padding: 5vh">
    <h1>Hello ${full_name}, thank you for using the Movie Ticket App</h1>

    <h3>
      Here is your verification code:
      <span>
        <input
          style="height: 2vh"
          value="${verificationKey}"
          type="text"
      /></span>
    </h3>

    <i
      >Note: please copy and paste it in the instructed fields hurry up, it will only be valid for the next 10
      minutes.</i
    >
  </div>`,
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
    text: `<div style="background-color: blueviolet; color: white; padding: 5vh">
      <h1>Hello ${full_name}, thank you for using the Movie Ticket App</h1>
      <h2>Here are your order Details:</h2>
      <div>
        <table style="font-family: arial, sans-serif; border-collapse: collapse; width: max-content">
          <tr>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">Detail</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">Information</th>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Full Name</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">${full_name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Movie Title</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">${movie_title}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Movie Date</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">${new Date(
              movie_date
            ).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Starting Time</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">${time_start}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Seats</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">${seats.toString()}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Total Price</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">${price * seats.length} ILS</td>
          </tr>
          <tr>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">Order ID</td>
            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              <input value=${secret_key} type="text" />
            </td>
          </tr>
        </table>
      </div>
      <br />
      <i
        >Note: Feel free to modify your seats or cancel your order at any time before your movie starts
        <a style="color: darkorange" target="_blank" href="http://localhost:3000/ticket-panel">Here</a>.</i
      >
    </div>`,
  };
  return SuccessfulPurchaseMailContent;
};

// Cancellation email
export const mailCancellationContent = (full_name: string) => {
  const cancellationMailContent: VerificationEmail = {
    subject: `Dear ${full_name}, Your order was cancelled successfully`,
    text: `<div style="background-color: blueviolet; color: white; text-align: center; padding: 5vh">
    <h1>Hello ${full_name}, thank you for using the Movie Ticket App</h1>
    <h2>Your Ticket Was Cancelled Successfully!</h2>
    <i>Note: Feel free to purchase new tickets any time
      <a style="color: darkorange" target="_blank" href="http://localhost:3000/">Here</a>.</i>
  </div>`,
  };
  return cancellationMailContent;
};
