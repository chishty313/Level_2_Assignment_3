import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { serviceRoutes } from '../modules/service/service.route';
import { slotRoutes } from '../modules/slot/slot.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { myBookingsRoutes } from '../modules/my-bookings/my-bookings.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/slots',
    route: slotRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/my-bookings',
    route: myBookingsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
