import { Router } from "express";

import {
  createBooking,
  getServices,
  getAvailableHours,
} from "../../controller/agendamento/booking.controller";

const router = Router();

router.get("/booking", getServices);

router.get(
  "/booking/:serviceId/hours",
  getAvailableHours
);

router.post("/booking", createBooking);

export default router;