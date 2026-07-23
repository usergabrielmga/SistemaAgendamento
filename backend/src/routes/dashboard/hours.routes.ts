import { Router } from "express";
import WorkingHoursController from "../../controller/dashboard/hours.controller";

const router = Router();

router.get("/working-hours", WorkingHoursController.getWorkingHours);

router.put("/working-hours", WorkingHoursController.updateWorkingHours);

export default router;