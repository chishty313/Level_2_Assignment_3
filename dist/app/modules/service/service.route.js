"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const slot_validation_1 = require("../slot/slot.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(service_validation_1.serviceValidations.createServiceValidationSchema), service_controller_1.serviceControllers.createService);
router.post('/slots', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(slot_validation_1.slotValidations.createSlotValidationSchema), service_controller_1.serviceControllers.createSlots);
router.get('/', (0, auth_1.default)('admin', 'user'), service_controller_1.serviceControllers.getAllServices);
router.get('/:id', (0, auth_1.default)('admin', 'user'), service_controller_1.serviceControllers.getSingleService);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(service_validation_1.serviceValidations.updateServiceValidationSchema), service_controller_1.serviceControllers.updateService);
router.delete('/:id', (0, auth_1.default)('admin'), service_controller_1.serviceControllers.deleteService);
exports.serviceRoutes = router;