import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { authMiddleware } from "../../middleware/middleware";
import clientController from "../../controller/dashboard/client.controller";

const router = Router();


router.post("/clients", async (req, res) => {
  clientController.createClient(req, res);
});

router.get("/clients", async (req, res) => {
  clientController.getAllClients(req, res);
});

router.get("/clients/:id_client", async (req, res) => {
  clientController.getClientById(req, res);
});

export default router;