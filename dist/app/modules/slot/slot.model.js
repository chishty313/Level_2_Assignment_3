"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotModel = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServiceModel',
        required: true,
    },
    date: {
        type: String,
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
}, { timestamps: true });
exports.SlotModel = (0, mongoose_1.model)('SlotModel', slotSchema);
