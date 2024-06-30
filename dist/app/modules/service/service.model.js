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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Service price is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Service duration is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// Query middleware
serviceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
serviceSchema.statics.isServiceExistsByName = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.ServiceModel.findOne({ name });
    });
};
exports.ServiceModel = (0, mongoose_1.model)('ServiceModel', serviceSchema);
