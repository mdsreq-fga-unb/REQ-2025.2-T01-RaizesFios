import { prisma } from '../../config/db';
import { CategoryData } from "../../api/schemas/category.schema";

export async function createCategory(data: CategoryData) {
  const category = await prisma.categoria.create({
    data: {
      nome: data.nome
    }
  });

  return category;
}

export async function listCategories() {
  return prisma.categoria.findMany();
}