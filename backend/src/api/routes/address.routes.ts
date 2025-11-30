import { Router } from "express";
import addressController from "../controllers/address.controller";
import { authenticate } from "../middlewares/auth.middleware";

const addressRouter = Router();

addressRouter.use(authenticate);

addressRouter.post("/", addressController.create);
addressRouter.get("/", addressController.list);
addressRouter.put("/:id", addressController.update);
addressRouter.delete("/:id", addressController.delete);

export default addressRouter;

