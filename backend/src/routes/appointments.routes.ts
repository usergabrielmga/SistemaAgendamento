import appointmentsController from "../controller/appointments.controller";
import router from "./service.routes";


router.post("/appointments", async (req, res) => {
    await appointmentsController.createAppointment(req, res);
});

export default router;