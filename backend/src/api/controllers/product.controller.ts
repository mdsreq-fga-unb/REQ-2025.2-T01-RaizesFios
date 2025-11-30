import { Request, Response } from "express";
import * as productService from "../../domain/services/product.service";
import {
  productSchema,
  getProductByIdSchema,
  searchProductsSchema,
  deleteProductSchema,
  updateProductSchema,
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
    const onlyActive = parsed.data.query.active;
    const products = await productService.searchProducts(searchTerm, onlyActive);

    return res.json(products);
  } catch (error) {
    console.error("Erro ao pesquisar produtos:", error);

    return res.status(500).json({
      error: "Erro interno ao pesquisar produtos.",
    });
  }
}

// --------------------------------------
// US003 - Excluir Produto 
// --------------------------------------
async function remove(req: Request, res: Response) {
  const parsed = deleteProductSchema.safeParse(req);

  if (!parsed.success) {
    return res.status(400).json({
      error: "ID inválido.",
      issues: parsed.error.issues,
    });
  }

  const id = parsed.data.params.id;

  try {
    const deleted = await productService.deleteProduct(id);

    return res.json({
      message: "Produto excluído com sucesso.",
      deleted,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Produto não encontrado.",
      });
    }

    return res.status(500).json({
      error: "Erro interno ao excluir produto.",
    });
  }
}

// ------------------------------
// Adicionei Atualizar Produto
// ------------------------------

async function update(req: Request, res: Response) {
  const parsed = updateProductSchema.safeParse({
    params: req.params,
    body: req.body,
  });

  if (!parsed.success) {
    return res.status(400).json({
      error: "Dados inválidos.",
      issues: parsed.error.issues,
    });
  }

  const { id } = parsed.data.params;
  const updatedData = parsed.data.body;

  try {
    const updated = await productService.updateProduct(id, updatedData);

    if (!updated) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    return res.json({
      message: "Produto atualizado com sucesso.",
      updated,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar produto:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Já existe um produto com este SKU.",
      });
    }

    return res.status(500).json({ error: "Falha interna ao atualizar produto." });
  }
}



export default {
  create,
  getById,
  search,
  remove,
  update,
};