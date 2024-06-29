import express from 'express';
import auth from '../../middlewares/auth';
import { slotControllers } from './slot.controller';

const router = express.Router();

router.get(
  '/availability',
  auth('admin', 'user'),
  slotControllers.getAllAvailabilityOfSlots,
);

export const slotRoutes = router;
