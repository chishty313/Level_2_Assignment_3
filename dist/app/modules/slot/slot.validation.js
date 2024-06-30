"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotValidations = void 0;
const zod_1 = require("zod");
const slot_constant_1 = require("./slot.constant");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time format, exprected "HH:MM" in 24 hours format',
});
const createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        service: zod_1.z.string(),
        date: zod_1.z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        isBooked: zod_1.z
            .enum([...slot_constant_1.SlotBookingStatus])
            .default('available'),
    })
        .refine((body) => {
        // startTime : 10:30 => 1970-01-01T10:30
        // endTime : 12:30 => 1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before end time !!',
    }),
});
const updateSlotValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        service: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        isBooked: zod_1.z
            .enum([...slot_constant_1.SlotBookingStatus])
            .optional(),
    })
        .refine((body) => {
        // startTime : 10:30 => 1970-01-01T10:30
        // endTime : 12:30 => 1970-01-01T12:30
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
    }, {
        message: 'Start time should be before end time !!',
    }),
});
exports.slotValidations = {
    createSlotValidationSchema,
    updateSlotValidationSchema,
};
