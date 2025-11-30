import { Request, Response } from "express";
import * as productService from "../../domain/services/product.service";
import {
  productSchema,
  getProductByIdSchema,
  searchProductsSchema,
} from "../schemas/product.schema";

// --------------------------------------
// US001 - Criar Produto
// --------------------------------------
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

// --------------------------------------
// US002 - Consultar Produto 
// --------------------------------------
async function getById(req: Request, res: Response) {
  try {
    const parsed = getProductByIdSchema.safeParse({ params: req.params });

    if (!parsed.success) {
      return res.status(400).json({
        error: "Parâmetros inválidos.",
        issues: parsed.error.issues,
      });
    }

    const id = parsed.data.params.id;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    return res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);

    return res.status(500).json({
      error: "Erro interno ao buscar produto.",
    });
  }
}

// Pelo nome 
async function search(req: Request, res: Response) {
  try {
    const parsed = searchProductsSchema.safeParse({ query: req.query });

    if (!parsed.success) {
      return res.status(400).json({
        error: "Parâmetros de busca inválidos.",
        issues: parsed.error.issues,
      });
    }

    const searchTerm = parsed.data.query.search;
    const products = await productService.searchProducts(searchTerm);

    return res.json(products);
  } catch (error) {
    console.error("Erro ao pesquisar produtos:", error);

    return res.status(500).json({
      error: "Erro interno ao pesquisar produtos.",
    });
  }
}

export default {
  create,
  getById,
  search,
};