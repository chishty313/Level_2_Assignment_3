import { Schema, model } from 'mongoose';
import { IService, ServiceInterfaceModel } from './service.interface';

const serviceSchema = new Schema<IService, ServiceInterfaceModel>(
  {
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
  },
  { timestamps: true },
);

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

serviceSchema.statics.isServiceExistsByName = async function (name: string) {
  return await ServiceModel.findOne({ name });
};

export const ServiceModel = model<IService, ServiceInterfaceModel>(
  'ServiceModel',
  serviceSchema,
);
