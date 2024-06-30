"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const service_route_1 = require("../modules/service/service.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const my_bookings_route_1 = require("../modules/my-bookings/my-bookings.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/services',
        route: service_route_1.serviceRoutes,
    },
    {
        path: '/slots',
        route: slot_route_1.slotRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRoutes,
    },
    {
        path: '/my-bookings',
        route: my_bookings_route_1.myBookingsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
