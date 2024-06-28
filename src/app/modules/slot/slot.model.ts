import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceModel',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: {
        values: ['available', 'booked', 'canceled'],
        message: '{VALUE} is not available',
      },
      default: 'available',
      required: true,
    },
  },
  { timestamps: true },
);

export const SlotModel = model<TSlot>('SlotModel', slotSchema);
