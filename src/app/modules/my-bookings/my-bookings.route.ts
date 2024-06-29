import express from 'express';
import auth from '../../middlewares/auth';
import { myBookingsControllers } from './my-bookings.controller';

const router = express.Router();

router.get('/', auth('user'), myBookingsControllers.getUsersBookings);

export const myBookingsRoutes = router;
