import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { VehicleTypes } from './booking.constant';

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceModel',
      required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'SlotModel',
      required: true,
    },
    vehicleType: {
      type: String,
      enum: {
        values: VehicleTypes,
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const BookingModel = model<TBooking>('BookingModel', bookingSchema);
