import { Model } from 'mongoose';

export interface IService {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceInterfaceModel extends Model<IService> {
  isServiceExistsByName(name: string): Promise<IService>;
}
