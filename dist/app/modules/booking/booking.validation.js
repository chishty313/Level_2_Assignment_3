"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = exports.updateBookingValidationSchema = exports.createBookingValidationSchema = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
exports.createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string(),
        slotId: zod_1.z.string(),
        vehicleType: zod_1.z.enum([...booking_constant_1.VehicleTypes]),
        vehicleBrand: zod_1.z.string(),
        vehicleModel: zod_1.z.string(),
        manufacturingYear: zod_1.z.number(),
        registrationPlate: zod_1.z.string(),
    }),
});
exports.updateBookingValidationSchema = zod_1.z.object({
    customer: zod_1.z.string().optional(),
    service: zod_1.z.string().optional(),
    slot: zod_1.z.string().optional(),
    vehicleType: zod_1.z.enum([...booking_constant_1.VehicleTypes]).optional(),
    vehicleBrand: zod_1.z.string().optional(),
    vehicleModel: zod_1.z.string().optional(),
    manufacturingYear: zod_1.z.string().optional(),
    registrationPlate: zod_1.z.string().optional(),
});
exports.BookingValidations = {
    createBookingValidationSchema: exports.createBookingValidationSchema,
    updateBookingValidationSchema: exports.updateBookingValidationSchema,
};
