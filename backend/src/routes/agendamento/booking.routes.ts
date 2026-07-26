import { Router } from "express";

import {
  createBooking,
  getServices,
  getAvailableHours,
  getAvailableDays,
} from "../../controller/agendamento/booking.controller";

const router = Router();

router.get("/booking", getServices);

router.get(
  "/booking/available-days",
  getAvailableDays
);

router.get(
  "/booking/:serviceId/hours",
  getAvailableHours
);

router.post("/booking", createBooking);


export default router;