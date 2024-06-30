"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error) => {
    const regex = /"([^"]+)"/;
    const match = error.message.match(regex);
    const extractedMessage = match[1];
    const errorMessages = [
        {
            path: '',
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate error',
        errorMessages,
    };
};
exports.default = handleDuplicateError;
