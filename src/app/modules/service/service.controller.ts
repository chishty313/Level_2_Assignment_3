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

const getAllServices = catchAsync(async (req, res) => {
  const getAllServicesResult = await serviceServices.getAllServicesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: getAllServicesResult,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const getSingleServiceResult = await serviceServices.getSingleServiceFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: getSingleServiceResult,
  });
});

const updateService = catchAsync(async (req, res) => {
  const updateServiceResult = await serviceServices.upteServiceIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: updateServiceResult,
  });
});

export const serviceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
};
