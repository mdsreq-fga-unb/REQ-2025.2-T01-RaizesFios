import { Router } from "express";
import { create, list } from "../controllers/category.controller";

const router = Router();

router.post("/", create);
router.get("/", list);

export default router;