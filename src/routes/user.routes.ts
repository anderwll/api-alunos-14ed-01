import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const router = Router();
const controller = new UserController();
const authMiddleware = new AuthMiddleware();

router.get("/users", authMiddleware.checkUser, controller.index);
router.post("/users", controller.create);

export default router;
