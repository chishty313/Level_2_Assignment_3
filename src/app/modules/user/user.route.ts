import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userSignUp,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginUserValidationSchema),
  UserControllers.userLogIn,
);

export const UserRoutes = router;
