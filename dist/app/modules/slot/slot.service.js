"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotServices = void 0;
const slot_model_1 = require("./slot.model");
const getAllAvailabilityOfSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, serviceId: service } = query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryConditions = { isBooked: { $ne: 'booked' } };
    if (date) {
        queryConditions.date = date;
    }
    if (service) {
        queryConditions.service = service;
    }
    return yield slot_model_1.SlotModel.find(queryConditions).populate('service');
});
exports.slotServices = {
    getAllAvailabilityOfSlotsFromDB,
};
