import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { serviceServices } from './service.service';

const createService = catchAsync(async (req, res) => {
  const createServiceResult = await serviceServices.createServiceIntoDB(
    req.body,
  );
  const {
    _id,
    name,
    description,
    price,
    duration,
    isDeleted,
    createdAt,
    updatedAt,
  } = createServiceResult;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: {
      _id,
      name,
      description,
      price,
      duration,
      isDeleted,
      createdAt,
      updatedAt,
    },
  });
});

export const serviceControllers = {
  createService,
};
