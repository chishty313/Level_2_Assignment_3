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
exports.serviceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("./service.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const service_constant_1 = require("./service.constant");
const slot_model_1 = require("../slot/slot.model");
const slot_utils_1 = require("../slot/slot.utils");
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isServiceExists = yield service_model_1.ServiceModel.isServiceExistsByName(payload.name);
    if (isServiceExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Service with same name already exists. Choose another name for your service!!');
    }
    return yield service_model_1.ServiceModel.create(payload);
});
const getAllServicesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceQuery = new QueryBuilder_1.default(service_model_1.ServiceModel.find(), query)
        .search(service_constant_1.serviceSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    return yield serviceQuery.modelQuery;
});
const getSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.ServiceModel.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No service available with this service ID.');
    }
    return service;
});
const updateServiceIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the service exists or not !!
    const isServiceExists = yield service_model_1.ServiceModel.findById(id);
    if (!isServiceExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service with this ID does not exists !!');
    }
    // Checking if the service deleted or not !!
    const isServiceDeleted = isServiceExists.isDeleted;
    if (isServiceDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service with this ID does not exists or deleted !!');
    }
    return yield service_model_1.ServiceModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if the service exists or not !!
    const isServiceExists = yield service_model_1.ServiceModel.findById(id);
    if (!isServiceExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service with this ID does not exists !!');
    }
    // Checking if the service deleted or not !!
    const isServiceDeleted = isServiceExists.isDeleted;
    if (isServiceDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service with this ID does not exists or deleted already !!');
    }
    return yield service_model_1.ServiceModel.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
});
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { service, date, startTime, endTime } = payload;
    // checking is the service available or not !!
    const isServiceExists = yield service_model_1.ServiceModel.findById(service);
    if (!isServiceExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service with this ID does not exists !!');
    }
    // fetching service duration from service
    const serviceDuration = isServiceExists.duration;
    // Converting time in to minutes
    const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
    const totalDuration = endMinutes - startMinutes;
    // calculalte number of slots
    const slotNumbers = totalDuration / serviceDuration;
    // generate slots
    const slots = [];
    for (let i = 0; i < slotNumbers; i++) {
        const slotStart = startMinutes + i * serviceDuration;
        const slotEnd = slotStart + serviceDuration;
        if (slotStart > endMinutes || slotEnd > endMinutes) {
            break;
        }
        const slot = {
            service,
            date: (0, slot_utils_1.dateFormatter)(new Date(date)),
            startTime: `${Math.floor(slotStart / 60)
                .toString()
                .padStart(2, '0')}:${Math.floor(slotStart % 60)
                .toString()
                .padStart(2, '0')}`,
            endTime: `${Math.floor(slotEnd / 60)
                .toString()
                .padStart(2, '0')}:${Math.floor(slotEnd % 60)
                .toString()
                .padStart(2, '0')}`,
        };
        slots.push(slot);
    }
    return yield slot_model_1.SlotModel.insertMany(slots);
});
exports.serviceServices = {
    createServiceIntoDB,
    getAllServicesFromDB,
    getSingleServiceFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
    createSlotsIntoDB,
};
