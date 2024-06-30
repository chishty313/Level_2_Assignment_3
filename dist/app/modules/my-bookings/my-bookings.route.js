"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBookingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const my_bookings_controller_1 = require("./my-bookings.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('user'), my_bookings_controller_1.myBookingsControllers.getUsersBookings);
exports.myBookingsRoutes = router;
