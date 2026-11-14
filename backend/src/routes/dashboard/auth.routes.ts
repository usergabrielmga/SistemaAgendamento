import { Router } from "express";
import authController from "../../controller/dashboard/auth.controller";

const router = Router();

router.post("/login", async (req, res) => {
  await authController.login(req, res);
});

export default router;