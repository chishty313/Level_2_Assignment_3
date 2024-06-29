import { SlotModel } from './slot.model';

const getAllAvailabilityOfSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  const { date, serviceId: service } = query;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryConditions: any = { isBooked: 'available' };
  if (date) {
    queryConditions.date = date;
  }
  if (service) {
    queryConditions.service = service;
  }
  console.log('Modified query conditions', queryConditions);

  return await SlotModel.find(queryConditions).populate('service');
};

export const slotServices = {
  getAllAvailabilityOfSlotsFromDB,
};
