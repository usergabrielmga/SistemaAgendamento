import { Router } from "express";
import dashboardController from "../../controller/dashboard/dashboard.controller";

const router = Router();

router.get("/stats", dashboardController.getStats);

export default router;