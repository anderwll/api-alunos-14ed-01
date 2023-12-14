import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/auth", controller.login);
router.get("/auth/logout", controller.logout);

export default router;
