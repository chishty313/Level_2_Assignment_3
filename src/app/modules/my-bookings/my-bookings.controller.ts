import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { myBookingsServices } from './my-bookings.service';

const getUsersBookings = catchAsync(async (req, res) => {
  const getUsersBookingsResult =
    await myBookingsServices.getUsersBookingsFromDB(req.user.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: getUsersBookingsResult,
  });
});

export const myBookingsControllers = {
  getUsersBookings,
};
