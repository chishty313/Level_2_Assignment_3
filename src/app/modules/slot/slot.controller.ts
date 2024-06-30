import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { slotServices } from './slot.service';
import catchAsync from '../../utils/catchAsync';

const getAllAvailabilityOfSlots = catchAsync(async (req, res) => {
  const getAllAvailabilityOfSlotsResult =
    await slotServices.getAllAvailabilityOfSlotsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: getAllAvailabilityOfSlotsResult,
  });
});

export const slotControllers = {
  getAllAvailabilityOfSlots,
};
