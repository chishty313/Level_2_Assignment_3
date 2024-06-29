import { BookingModel } from '../booking/booking.model';
import { UserModel } from '../user/user.model';

const getUsersBookingsFromDB = async (email: string) => {
  const findUserId = await UserModel.findOne({ email });

  console.log({ mybookings: findUserId });

  const userDetails = await BookingModel.find({ customer: findUserId?._id })
    .populate({ path: 'customer', select: '_id name email phone address' })
    .populate({
      path: 'service',
      select: '_id name description price duration isDeleted',
    })
    .populate({
      path: 'slot',
      select: '_id service date startTime endTime isBooked',
    });

  console.log({ userDetails });

  return userDetails;
};

export const myBookingsServices = {
  getUsersBookingsFromDB,
};
