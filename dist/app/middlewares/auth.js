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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer === null || tokenWithBearer === void 0 ? void 0 : tokenWithBearer.split(' ')[1];
        // check if the token is sent from the client
        if (!token) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }
        // check if the token is valid or not
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secrect);
        }
        catch (error) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }
        const { email, role } = decoded;
        // checking if the user already exists or not
        const user = yield user_model_1.UserModel.isUserExistsByEmail(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found !!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }
        // decoded
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
