import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import auth from '../../middlewares/auth';
import { bookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidations.createBookingValidationSchema),
  bookingControllers.bookService,
);

export const bookingRoutes = router;
