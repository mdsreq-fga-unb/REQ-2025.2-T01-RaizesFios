import { Router } from "express";
import healthController from "../controllers/health.controller";
import userRouter from "./user.routes";
import productRouter from "./product.routes";  

const router = Router();

router.get("/health", healthController.check);
router.use("/users", userRouter);
router.use("/products", productRouter); 

export default router;