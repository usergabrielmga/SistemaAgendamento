import appointmentsController from "../../controller/dashboard/appointments.controller";
import router from "./service.routes";


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