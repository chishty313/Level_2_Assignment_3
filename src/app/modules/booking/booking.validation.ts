import { z } from 'zod';
import { VehicleTypes } from './booking.constant';

export const createBookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum([...VehicleTypes] as [string, ...string[]]),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const updateBookingValidationSchema = z.object({
  customer: z.string().optional(),
  service: z.string().optional(),
  slot: z.string().optional(),
  vehicleType: z.enum([...VehicleTypes] as [string, ...string[]]).optional(),
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  manufacturingYear: z.string().optional(),
  registrationPlate: z.string().optional(),
});

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
