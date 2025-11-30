import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

// US001 — Criar Produto
productRouter.post("/", productController.create);

// US002 — Consultar Produto
productRouter.get("/:id", productController.getById);
productRouter.get("/", productController.search); // Exemplo: GET /products/search?search=creme

export default productRouter;