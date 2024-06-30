"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const slot_controller_1 = require("./slot.controller");
const router = express_1.default.Router();
router.get('/availability', (0, auth_1.default)('admin', 'user'), slot_controller_1.slotControllers.getAllAvailabilityOfSlots);
exports.slotRoutes = router;
