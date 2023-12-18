import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AssessmentController from "../controllers/assessment.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const router = Router();
const authMiddleware = new AuthMiddleware();
const controller = new AssessmentController();

router.post("/assessments", authMiddleware.checkUser, controller.create);
router.get("/assessments", authMiddleware.checkUser, controller.findAll);

export default router;
