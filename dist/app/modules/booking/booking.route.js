"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.bookingControllers.bookService);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.bookingControllers.getAllBookings);
exports.bookingRoutes = router;
