import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ServiceModel } from '../service/service.model';
import { UserModel } from '../user/user.model';
import { TBooking } from './booking.interface';
import { SlotModel } from '../slot/slot.model';
import { BookingModel } from './booking.model';
import mongoose from 'mongoose';

const bookServiceIntoDB = async (email: string, payload: Partial<TBooking>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const {
      serviceId: service,
      slotId: slot,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    } = payload;

    const findUserId = await UserModel.findOne({ email });

    console.log(findUserId);

    //   Checking if the service id is valid or not
    const isServiceExists = await ServiceModel.findById(service);
    if (!isServiceExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Provided Service is not found !!!',
      );
    }

    //   Checking if the slot id is valid and it is available or not
    const isSlotExists = await SlotModel.findById(slot);
    if (!isSlotExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Provided slot is not found !!!',
      );
    }

    if (isSlotExists.isBooked !== 'available') {
      throw new AppError(
        httpStatus.CONFLICT,
        `Provided slot is ${isSlotExists.isBooked} !!!`,
      );
    }

    const serviceBooking = {
      customer: findUserId?._id,
      service,
      slot,
      vehicleType,
      vehicleModel,
      vehicleBrand,
      manufacturingYear,
      registrationPlate,
    };

    await SlotModel.findByIdAndUpdate(
      slot,
      { isBooked: 'booked' },
      { session },
    );

    const booking = await BookingModel.create([serviceBooking], [session]);
    console.log({ booking });

    if (!booking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Can not book a service !!!');
    }

    console.log(booking[0]._id);

    const bookedService = await BookingModel.findById(booking[0]._id)
      .populate({ path: 'customer', select: '_id name email phone address' })
      .populate({
        path: 'service',
        select: '_id name description price duration isDeleted',
      })
      .populate({
        path: 'slot',
        select: '_id service date startTime endTime isBooked',
      });

    console.log(bookedService);

    await session.commitTransaction();
    await session.endSession();

    return bookedService;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Can not booked a service !!!');
  }
};

export const bookingServices = {
  bookServiceIntoDB,
};
