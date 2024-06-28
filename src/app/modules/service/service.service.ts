import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IService } from './service.interface';
import { ServiceModel } from './service.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { serviceSearchableFields } from './service.constant';
import { TSlot } from '../slot/slot.interface';
import { SlotModel } from '../slot/slot.model';
import { dateFormatter } from '../slot/slot.utils';

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

const createSlotsIntoDB = async (payload: TSlot) => {
  const { service, date, startTime, endTime } = payload;

  // checking is the service available or not !!
  const isServiceExists = await ServiceModel.findById(service);
  if (!isServiceExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Service with this ID does not exists !!',
    );
  }

  // fetching service duration from service
  const serviceDuration = isServiceExists.duration;

  // Converting time in to minutes
  const startMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const endMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

  const totalDuration = endMinutes - startMinutes;

  // calculalte number of slots
  const slotNumbers = totalDuration / serviceDuration;

  // generate slots
  const slots: TSlot[] = [];

  for (let i = 0; i < slotNumbers; i++) {
    const slotStart = startMinutes + i * serviceDuration;
    const slotEnd = slotStart + serviceDuration;

    if (slotStart > endMinutes || slotEnd > endMinutes) {
      break;
    }

    const slot: TSlot = {
      service,
      date: dateFormatter(new Date(date)),
      startTime: `${Math.floor(slotStart / 60)
        .toString()
        .padStart(2, '0')}:${Math.floor(slotStart % 60)
        .toString()
        .padStart(2, '0')}`,
      endTime: `${Math.floor(slotEnd / 60)
        .toString()
        .padStart(2, '0')}:${Math.floor(slotEnd % 60)
        .toString()
        .padStart(2, '0')}`,
    };
    slots.push(slot);
  }

  return await SlotModel.insertMany(slots);
};

export const serviceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  createSlotsIntoDB,
};
