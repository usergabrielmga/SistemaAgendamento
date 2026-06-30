import { Router } from "express";
import BlockedDatesController from "../controller/blocked.dates.controller";

const router = Router();

router.post("/blocked-dates", BlockedDatesController.createBlockedDate);

router.get("/blocked-dates", BlockedDatesController.getAllBlockedDates);

router.put("/blocked-dates/:id_block", BlockedDatesController.updateBlockedDate);

router.delete("/blocked-dates/:id_block", BlockedDatesController.deleteBlockedDate);

export default router;