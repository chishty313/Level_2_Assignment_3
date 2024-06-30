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
exports.myBookingsServices = void 0;
const booking_model_1 = require("../booking/booking.model");
const user_model_1 = require("../user/user.model");
const getUsersBookingsFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findUserId = yield user_model_1.UserModel.findOne({ email });
    const userDetails = yield booking_model_1.BookingModel.find({ customer: findUserId === null || findUserId === void 0 ? void 0 : findUserId._id })
        .select('-customer')
        .populate({
        path: 'service',
        select: '_id name description price duration isDeleted',
    })
        .populate({
        path: 'slot',
        select: '_id service date startTime endTime isBooked',
    });
    return userDetails;
});
exports.myBookingsServices = {
    getUsersBookingsFromDB,
};
