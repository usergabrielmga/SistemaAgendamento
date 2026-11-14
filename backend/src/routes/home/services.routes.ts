import { Router } from "express";
import { getServices } from "../../controller/agendamento/booking.controller";


const router = Router();

router.get("/booking", getServices);

export default router;