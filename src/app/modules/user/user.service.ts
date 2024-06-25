import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { UserModel } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

const userSignUpIntoDB = async (payload: TUser) => {
  // checking if the user already exists or not !!
  const isUserExists = await UserModel.isUserExistsByEmail(payload?.email);
  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${isUserExists?.name} with ${payload?.email} this email as ${payload?.role} is already signed up. Please login using your existing credentials.`,
    );
  }
  return await UserModel.create(payload);
};

const userLogInFromDB = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // checking if the user already exists or not !!
  const isUserExists = await UserModel.isUserExistsByEmail(email);
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `User with email: ${email} does not exists !!.`,
    );
  }

  // checking if the password is correct or not
  if (!(await UserModel.isPasswordMatched(password, isUserExists?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !!');
  }

  // Access Granted: send AccessToken, RefreshToken
  // create token and send to the client

  const jwtPayload = {
    email: isUserExists?.email,
    role: isUserExists?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secrect as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    isUserExists,
  };
};

export const UserServices = {
  userSignUpIntoDB,
  userLogInFromDB,
};
