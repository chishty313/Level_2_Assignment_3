import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userSignUp = catchAsync(async (req, res) => {
  const userSignUpResult = await UserServices.userSignUpIntoDB(req.body);
  const { _id, name, email, phone, role, address, createdAt, updatedAt } =
    userSignUpResult;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: {
      _id,
      name,
      email,
      phone,
      role,
      address,
      createdAt,
      updatedAt,
    },
  });
});

const userLogIn = catchAsync(async (req, res) => {
  // console.log(req.user);
  const userLogInResult = await UserServices.userLogInFromDB(req.body);
  const { accessToken, isUserExists } = userLogInResult;

  const { _id, name, email, phone, role, address, createdAt, updatedAt } =
    isUserExists;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: {
      _id,
      name,
      email,
      phone,
      role,
      address,
      createdAt,
      updatedAt,
    },
  });
});

export const UserControllers = {
  userSignUp,
  userLogIn,
};
