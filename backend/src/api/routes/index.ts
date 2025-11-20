import { Router } from "express";
import healthController from "../controllers/health.controller";
import userRouter from "./user.routes";

const router = Router();

router.get("/health", healthController.check);
router.use("/users", userRouter);

export default router;
