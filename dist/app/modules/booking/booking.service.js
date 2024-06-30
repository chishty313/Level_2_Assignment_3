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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const user_model_1 = require("../user/user.model");
const slot_model_1 = require("../slot/slot.model");
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
const bookServiceIntoDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { serviceId: service, slotId: slot, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate, } = payload;
        const findUserId = yield user_model_1.UserModel.findOne({ email });
        //   Checking if the service id is valid or not
        const isServiceExists = yield service_model_1.ServiceModel.findById(service);
        if (!isServiceExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Provided Service is not found !!!');
        }
        //   Checking if the slot id is valid and it is available or not
        const isSlotExists = yield slot_model_1.SlotModel.findById(slot);
        if (!isSlotExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Provided slot is not found !!!');
        }
        if (isSlotExists.isBooked === 'booked') {
            throw new AppError_1.default(http_status_1.default.CONFLICT, `Provided slot is ${isSlotExists.isBooked} !!!`);
        }
        yield slot_model_1.SlotModel.findByIdAndUpdate(slot, { isBooked: 'booked' }, { session, new: true });
        const serviceBooking = {
            customer: findUserId === null || findUserId === void 0 ? void 0 : findUserId._id,
            service,
            slot,
            vehicleType,
            vehicleModel,
            vehicleBrand,
            manufacturingYear,
            registrationPlate,
        };
        const booking = yield booking_model_1.BookingModel.create([serviceBooking], [session]);
        if (!booking.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Can not book a service !!!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const bookedService = yield booking_model_1.BookingModel.findById(booking[0]._id)
            .populate({ path: 'customer', select: '_id name email phone address' })
            .populate({
            path: 'service',
            select: '_id name description price duration isDeleted',
        })
            .populate({
            path: 'slot',
            select: '_id service date startTime endTime isBooked',
        });
        return bookedService;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Can not booked a service !!!');
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.BookingModel.find()
        .populate({ path: 'customer', select: '_id name email phone address' })
        .populate({
        path: 'service',
        select: '_id name description price duration isDeleted',
    })
        .populate({
        path: 'slot',
        select: '_id service date startTime endTime isBooked',
    });
});
exports.bookingServices = {
    bookServiceIntoDB,
    getAllBookingsFromDB,
};
