import { z } from 'zod';
import { SlotBookingStatus } from './slot.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format, exprected "HH:MM" in 24 hours format',
  },
);

const createSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string(),
      date: z.string(),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
      isBooked: z
        .enum([...SlotBookingStatus] as [string, ...string[]])
        .default('available'),
    })
    .refine(
      (body) => {
        // startTime : 10:30 => 1970-01-01T10:30
        // endTime : 12:30 => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before end time !!',
      },
    ),
});

const updateSlotValidationSchema = z.object({
  body: z
    .object({
      service: z.string().optional(),
      date: z.string().optional(),
      startTime: timeStringSchema.optional(),
      endTime: timeStringSchema.optional(),
      isBooked: z
        .enum([...SlotBookingStatus] as [string, ...string[]])
        .optional(),
    })
    .refine(
      (body) => {
        // startTime : 10:30 => 1970-01-01T10:30
        // endTime : 12:30 => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before end time !!',
      },
    ),
});

export const slotValidations = {
  createSlotValidationSchema,
  updateSlotValidationSchema,
};
