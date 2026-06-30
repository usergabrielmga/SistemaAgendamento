import router from "./client.routes";
import authController from "../controller/auth.controller";

router.post("/login", async (req, res) => {
    authController.login(req, res);
});


export default router;