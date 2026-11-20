
import { Router } from "express";
import appointmentsController from "../../controller/dashboard/appointments.controller";

const router = Router();

router.post("/appointments", async (req, res) => {
  await appointmentsController.createAppointment(req, res);
});

router.get("/appointments", async (req, res) => {
  await appointmentsController.getAllAppointments(req, res);
});

router.patch("/appointments/:id/status", async (req, res) => {
  await appointmentsController.updateAppointmentStatus(req, res);
});

export default router;
