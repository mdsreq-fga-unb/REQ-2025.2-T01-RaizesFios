import { Router } from "express";
import authController from "../controllers/auth.controller";
import { loginLimiter } from "../middlewares/loginLimiter.middleware";

const authRouter = Router();

authRouter.post("/login", loginLimiter, authController.login);

authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);

export default authRouter;
