import { Request, Response } from "express";
import * as productService from "../../domain/services/product.service";
import { productSchema } from "../schemas/product.schema";

async function create(req: Request, res: Response) {
  try {
    const parsed = productSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Dados inválidos.",
        issues: parsed.error.issues,
      });
    }

    const newProduct = await productService.createProduct(parsed.data);

    return res.status(201).json(newProduct);
  } catch (error: unknown) {
    console.error("Erro ao criar produto:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      return res.status(409).json({
        error: "Registro duplicado.",
        details: (error as any).meta,
      });
    }

    return res.status(500).json({
      error: "Falha interna ao criar produto.",
    });
  }
}

export default {
  create,
};