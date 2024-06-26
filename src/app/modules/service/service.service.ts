import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IService } from './service.interface';
import { ServiceModel } from './service.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { serviceSearchableFields } from './service.constant';

const createServiceIntoDB = async (payload: IService) => {
  const isServiceExists = await ServiceModel.isServiceExistsByName(
    payload.name,
  );

  if (isServiceExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Service with same name already exists. Choose another name for your service!!',
    );
  }

  return await ServiceModel.create(payload);
};

const getAllServicesFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(ServiceModel.find(), query)
    .search(serviceSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  return await serviceQuery.modelQuery;
};

const getSingleServiceFromDB = async (id: string) => {
  const service = await ServiceModel.findById(id);

  if (!service) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No service available with this service ID.',
    );
  }

  return service;
};

const updateServiceIntoDB = async (id: string, payload: Partial<IService>) => {
  // Checking if the service exists or not !!
  const isServiceExists = await ServiceModel.findById(id);
  if (!isServiceExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service with this ID does not exists !!',
    );
  }

  // Checking if the service deleted or not !!
  const isServiceDeleted = isServiceExists.isDeleted;
  if (isServiceDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service with this ID does not exists or deleted !!',
    );
  }

  return await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteServiceFromDB = async (id: string) => {
  // Checking if the service exists or not !!
  const isServiceExists = await ServiceModel.findById(id);
  if (!isServiceExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service with this ID does not exists !!',
    );
  }

  // Checking if the service deleted or not !!
  const isServiceDeleted = isServiceExists.isDeleted;
  if (isServiceDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service with this ID does not exists or deleted already !!',
    );
  }

  return await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const serviceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
