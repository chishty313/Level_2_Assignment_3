import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IService } from './service.interface';
import { ServiceModel } from './service.model';

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

export const serviceServices = { createServiceIntoDB };
