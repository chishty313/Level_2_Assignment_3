import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { serviceRoutes } from '../modules/service/service.route';
import { slotRoutes } from '../modules/slot/slot.route';
import { bookingRoutes } from '../modules/booking/booking.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
