import serviceController from "../../controller/dashboard/service.controller";
import router from "./auth.routes";


router.post("/services",  async (req, res) => {
    serviceController.createService(req, res);
});

router.get("/services", async (req, res) => {
    serviceController.getAllServices(req, res);
});

router.get("/services/:id_service", async (req, res) => {
    serviceController.getServiceById(req, res);
});

router.put("/services/:id_service", async (req, res) => {
    serviceController.updateService(req, res);
});

router.delete("/services/:id_service", async (req, res) => {
    serviceController.deleteService(req, res);
});

export default router;