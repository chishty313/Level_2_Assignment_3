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
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const userSignUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userSignUpResult = yield user_service_1.UserServices.userSignUpIntoDB(req.body);
    const { _id, name, email, phone, role, address, createdAt, updatedAt } = userSignUpResult;
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User registered successfully',
        data: {
            _id,
            name,
            email,
            phone,
            role,
            address,
            createdAt,
            updatedAt,
        },
    });
}));
const userLogIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user);
    const userLogInResult = yield user_service_1.UserServices.userLogInFromDB(req.body);
    const { accessToken, isUserExists } = userLogInResult;
    const { _id, name, email, phone, role, address, createdAt, updatedAt } = isUserExists;
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User logged in successfully',
        token: accessToken,
        data: {
            _id,
            name,
            email,
            phone,
            role,
            address,
            createdAt,
            updatedAt,
        },
    });
}));
exports.UserControllers = {
    userSignUp,
    userLogIn,
};
