// Imports
import express, { Router } from 'express';
require('dotenv').config();
import Ticket from '../../../schemas/ticketsSchema';
import { Tickets } from '../../../types/types';
import { generateVerificationKey, generateSecretKey } from '../../utils/tickets-route-utils';
import {
  sendMailFn,
  mailVerificationContent,
  mailSuccessfulPurchase,
  mailCancellationContent,
} from '../../utils/send-email';
import { VerificationEmail } from '../../../types/types';
import {
  verificationKeyVerify,
  validateCreditCardDetails,
  validateEmail,
  validateAge,
  checkSeatAvailability,
  checkMovieDateCompareToOrder,
} from '../../middlewares/ticketsRouterMiddlewares';
import { updateMovieSeats } from '../../utils/movie-route-utils';
import { AddTicket } from '../../utils/tickets-route-utils';

// Start Router
const router: Router = express.Router();

// Get all tickets
router.get('/view-tickets', async (_req: express.Request, res: express.Response) => {
  try {
    const allTickets: Tickets[] = await Ticket.find();
    res.status(200).json({ statusCode: 200, message: allTickets });
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: 'failed to load tickets' });
  }
});

// Post new ticket
// this req: All the info for the tickets, token, card details
router.post(
  '/purchase-ticket',
  verificationKeyVerify,
  checkSeatAvailability,
  validateCreditCardDetails,
  async (_req: express.Request, res: express.Response) => {
    try {
      const secret_key = generateSecretKey();
      const { full_name, movie_id, email, movie_title, seats, price, movie_date, time_start } = _req.body;
      if (await AddTicket(full_name, secret_key, movie_id, email, movie_title, seats, price, movie_date, time_start)) {
        await updateMovieSeats('add', seats, movie_id);
        const mailContent: VerificationEmail = mailSuccessfulPurchase(
          full_name,
          movie_title,
          seats,
          secret_key,
          price,
          movie_date,
          time_start
        );
        sendMailFn(email, mailContent.subject, mailContent.text);
        res.status(200).json({ statusCode: 200, message: 'Ticket was purchased successfully' });
      }
    } catch (err) {
      res.status(401).json({ statusCode: 500, message: 'failed to purchase ticket' });
    }
  }
);

// Get verification by user full name and email
// Middleware : email, age over 18
router.post('/get-verification', validateEmail, validateAge, (_req: express.Request, res: express.Response) => {
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
    message: `You have successfully verified ${_req.body.email}`,
    process_token: _req.process_token,
  });
});

// User Can change his sit and cancel his order while viewing his order details
router.get('/view-ticket-details/:orderId', async (_req: express.Request, res: express.Response) => {
  try {
    const currentTicket = await Ticket.findOne({ secret_id: _req.params.orderId });
    res.status(200).json({ statusCode: 200, message: currentTicket });
  } catch (err) {
    res.status(404).json({ statusCode: 404, message: 'could not find ticket' });
  }
});

// User can change sit with his order secret_key
// MiddleWare Check on Date
router.put(
  '/change-sit',
  verificationKeyVerify,
  checkMovieDateCompareToOrder,
  checkSeatAvailability, // seats , movie_id
  async (_req: express.Request, res: express.Response) => {
    try {
      if (_req.verified) {
        const { email, seats, orderId } = _req.body;
        const currentTicket = await Ticket.findOneAndUpdate({ secret_key: orderId }, { sit: seats });
        const mailContent: VerificationEmail = mailSuccessfulPurchase(
          currentTicket.full_name,
          currentTicket.movie_title,
          currentTicket.seats,
          currentTicket.secret_key,
          currentTicket.price,
          currentTicket.movie_date,
          currentTicket.time_start
        );
        sendMailFn(email, mailContent.subject, mailContent.text);

        res.status(200).json({
          statusCode: 200,
          message: `Success, an updated receipt was sent to ${email}`,
          process_token: _req.process_token,
        });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 200, message: `Processed failed, please ty again later` });
    }
  }
);

// User Can Cancel his ticket
// MiddleWare Check on Date
router.delete('/cancel-ticket', checkMovieDateCompareToOrder, async (_req: express.Request, res: express.Response) => {
  const { orderId, full_name, email } = _req.body;
  try {
    await Ticket.findOneAndDelete({ secret_key: orderId });
    const mailContent: VerificationEmail = mailCancellationContent(full_name);
    sendMailFn(email, mailContent.subject, mailContent.text);
    res.status(200).json({ statusCode: 200, message: 'Your ticket was cancelled successfully' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: 'Server Error, please comeback later' });
  }
});

export default router;
