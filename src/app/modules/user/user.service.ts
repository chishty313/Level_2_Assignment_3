import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const userSignUpIntoDB = async (payload: TUser) => {
  // checking if the user already exists or not !!
  const isUserExists = await UserModel.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${isUserExists.name} with ${payload.email} this email as ${payload.role} is already signed up. Please login using your existing credentials.`,
    );
  }
  return await UserModel.create(payload);
};

export const UserServices = {
  userSignUpIntoDB,
};
