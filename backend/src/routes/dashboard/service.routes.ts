
import { Router } from "express";
import serviceController from "../../controller/dashboard/service.controller";

const router = Router();

router.post("/services", async (req, res) => {
  await serviceController.createService(req, res);
});

router.get("/services", async (req, res) => {
  await serviceController.getAllServices(req, res);
});

router.get("/services/:id_service", async (req, res) => {
  await serviceController.getServiceById(req, res);
});

router.put("/services/:id_service", async (req, res) => {
  await serviceController.updateService(req, res);
});

router.delete("/services/:id_service", async (req, res) => {
  await serviceController.deleteService(req, res);
});

export default router;
