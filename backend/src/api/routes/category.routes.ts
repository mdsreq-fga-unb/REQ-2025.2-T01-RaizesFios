import { Router } from "express";
import { create, list } from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, roleMiddleware(["ADMIN"]), create);  
router.get("/", list);

export default router;
