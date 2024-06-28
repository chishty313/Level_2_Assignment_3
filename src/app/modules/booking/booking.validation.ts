import { z } from 'zod';
import { VehicleTypes } from './booking.constant';

export const createBookingValidationSchema = z.object({
  customer: z.string(),
  service: z.string(),
  slot: z.string(),
  vehicleType: z.enum([...VehicleTypes] as [string, ...string[]]),
  vehicleBrand: z.string(),
  vehicleModel: z.string(),
  manufacturingYear: z.string(),
  registrationPlate: z.string(),
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
