"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    // Checking if the data is empty or not
    if (Array.isArray(data.data) && data.data.length === 0) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'No Data Found',
            data: [],
        });
    }
    else {
        res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: data.success,
            statusCode: data.statusCode,
            message: data.message,
            token: data === null || data === void 0 ? void 0 : data.token,
            data: data.data,
        });
    }
};
exports.default = sendResponse;
