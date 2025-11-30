import { Router } from "express";
import healthController from "../controllers/health.controller";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import addressRouter from "./address.routes";
import productRouter from "./product.routes"; 
import categoryRoutes from "./category.routes";

const router = Router();

router.get("/health", healthController.check);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/addresses", addressRouter);
router.use("/products", productRouter); 
router.use("/categories", categoryRoutes);

export default router;