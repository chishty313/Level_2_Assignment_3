"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        phone: zod_1.z.string(),
        role: zod_1.z.enum(['admin', 'user']),
        address: zod_1.z.string(),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email id is required !!' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.UserValidation = {
    createUserValidationSchema: exports.createUserValidationSchema,
    loginUserValidationSchema,
};
