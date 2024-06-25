import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { serviceRoutes } from '../modules/service/service.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
