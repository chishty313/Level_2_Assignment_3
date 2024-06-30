"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServiceModel',
        required: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SlotModel',
        required: true,
    },
    vehicleType: {
        type: String,
        enum: {
            values: booking_constant_1.VehicleTypes,
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
}, { timestamps: true });
exports.BookingModel = (0, mongoose_1.model)('BookingModel', bookingSchema);
