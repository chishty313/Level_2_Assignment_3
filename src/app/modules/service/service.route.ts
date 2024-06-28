import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { serviceValidations } from './service.validation';
import { serviceControllers } from './service.controller';
import auth from '../../middlewares/auth';
import { slotValidations } from '../slot/slot.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(serviceValidations.createServiceValidationSchema),
  serviceControllers.createService,
);

router.post(
  '/slots',
  auth('admin'),
  validateRequest(slotValidations.createSlotValidationSchema),
  serviceControllers.createSlots,
);

router.get('/', auth('admin', 'user'), serviceControllers.getAllServices);

router.get('/:id', auth('admin', 'user'), serviceControllers.getSingleService);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(serviceValidations.updateServiceValidationSchema),
  serviceControllers.updateService,
);

router.delete('/:id', auth('admin'), serviceControllers.deleteService);

export const serviceRoutes = router;
