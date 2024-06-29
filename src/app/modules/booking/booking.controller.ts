import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';

const bookService = catchAsync(async (req, res) => {
  const { email } = req.user;
  const bookServiceResult = await bookingServices.bookServiceIntoDB(
    email,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: bookServiceResult,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const getAllBookingsResult = await bookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: getAllBookingsResult,
  });
});

export const bookingControllers = {
  bookService,
  getAllBookings,
};
