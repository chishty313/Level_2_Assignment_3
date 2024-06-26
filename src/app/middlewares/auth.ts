import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    // console.log(token);
    console.log(tokenWithBearer?.split(' '));
    const token = tokenWithBearer?.split(' ')[1];

    // check if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!!');
    }

    // check if the token is valid or not
    const decoded = jwt.verify(
      token,
      config.jwt_access_secrect as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    // checking if the user already exists or not
    const user = await UserModel.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        `${role}'s are not authorized for this job !!!`,
      );
    }
    // decoded
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
