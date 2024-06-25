import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { serviceValidations } from './service.validation';
import { serviceControllers } from './service.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(serviceValidations.createServiceValidationSchema),
  serviceControllers.createService,
);

router.get('/', auth('admin', 'user'), serviceControllers.getAllServices);

router.get('/:id', auth('admin', 'user'), serviceControllers.getSingleService);

export const serviceRoutes = router;
