import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userSignUp = catchAsync(async (req, res) => {
  console.log(req.)
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

export const UserControllers = {
  userSignUp,
};
