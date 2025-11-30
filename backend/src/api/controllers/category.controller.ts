import { Request, Response } from "express";
import { createCategory, listCategories } from "../../domain/services/category.service";
import { categorySchema } from "../schemas/category.schema";

export async function create(req: Request, res: Response) {
  try {
    const parsed = categorySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        issues: parsed.error.flatten()
      });
    }

    const newCategory = await createCategory(parsed.data);

    return res.status(201).json(newCategory);

  } catch (error: any) {
    console.error("Erro ao criar categoria:", error);

    // Erro de unicidade do Prisma (P2002)
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return res.status(409).json({ error: "Já existe uma categoria com este nome." });
    }

    return res.status(500).json({ error: "Falha interna ao criar categoria." });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const categories = await listCategories();
    return res.json(categories);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    return res.status(500).json({ error: "Falha interna ao listar categorias." });
  }
}
