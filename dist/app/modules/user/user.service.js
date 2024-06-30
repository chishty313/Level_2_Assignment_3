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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../config"));
const userSignUpIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user already exists or not !!
    const isUserExists = yield user_model_1.UserModel.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `${isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.name} with ${payload === null || payload === void 0 ? void 0 : payload.email} this email as ${payload === null || payload === void 0 ? void 0 : payload.role} is already signed up. Please login using your existing credentials.`);
    }
    return yield user_model_1.UserModel.create(payload);
});
const userLogInFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // checking if the user already exists or not !!
    const isUserExists = yield user_model_1.UserModel.isUserExistsByEmail(email);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User with email: ${email} does not exists !!.`);
    }
    // checking if the password is correct or not
    if (!(yield user_model_1.UserModel.isPasswordMatched(password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched !!');
    }
    // Access Granted: send AccessToken, RefreshToken
    // create token and send to the client
    const jwtPayload = {
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secrect, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
        isUserExists,
    };
});
exports.UserServices = {
    userSignUpIntoDB,
    userLogInFromDB,
};
