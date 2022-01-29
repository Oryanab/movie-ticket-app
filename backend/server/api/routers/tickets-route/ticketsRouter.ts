import express, { Router } from 'express';
require('dotenv').config();
import Ticket from '../../../schemas/ticketsSchema';
import { Tickets } from '../../../types/types';
import { generateSecretKey, generateVerificationKey } from '../../utils/tickets-route-utils';
import { sendMailFn, mailVerificationContent } from '../../utils/send-email';
import { VerificationEmail } from '../../../types/types';
import { verificationKeyVerify } from '../../middlewares/ticketsRouterMiddlewares';

// Start Router
const router: Router = express.Router();

// Endpoints
// Endpoints

// Get all tickets
router.get('/view-tickets', async (_req: express.Request, res: express.Response) => {
  try {
    const allTickets: Tickets[] = await Ticket.find();
    res.status(200).json({ statusCode: 401, message: allTickets });
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: 'failed to load tickets' });
  }
});

// Post new ticket
router.post('/add-ticket', async (_req: express.Request, res: express.Response) => {
  try {
    const { full_name, movie_id, email, movie_title, sit, price, movie_date, time_start } = _req.body;
    await Ticket.insertMany({
      full_name,
      secret_key: generateSecretKey(),
      movie_id,
      email,
      movie_title,
      sit,
      price,
      movie_date,
      time_start,
      purchase_date: new Date(),
    });
    res.status(200).json({ statusCode: 200, message: 'Ticket was purchased successfully' });
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: 'failed to purchase ticket' });
  }
});

// Get verification by user full name and email
router.post('/get-verification', (_req: express.Request, res: express.Response) => {
  try {
    const { full_name, email } = _req.body;
    const verificationToken = generateVerificationKey(full_name, email);
    const mailContent: VerificationEmail = mailVerificationContent(full_name, verificationToken);
    sendMailFn(email, mailContent.subject, mailContent.text);
    // Send email
    res.status(200).json({ statusCode: 200, message: `Verification code was send to ${email}` });
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: 'failed to send verification' });
  }
});

// Verify user full name and email
router.post('/verify', verificationKeyVerify, (_req: express.Request, res: express.Response) => {
  res.status(200).json({
    statusCode: 200,
    message: `You have successfully verified ${_req.body.email}, please continue purchasing your ticket`,
  });
});

export default router;