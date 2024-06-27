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

export const BookingValidations = {
  createBookingValidationSchema,
};
