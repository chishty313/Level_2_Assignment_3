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

export const serviceServices = { createServiceIntoDB, getAllServicesFromDB };
