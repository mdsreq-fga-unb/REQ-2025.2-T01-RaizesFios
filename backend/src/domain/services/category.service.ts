import categoryRepository from '../repositories/category.repository';
import { CategoryData } from "../../api/schemas/category.schema";

export async function createCategory(data: CategoryData) {
  return categoryRepository.create(data);
}

export async function listCategories() {
  return categoryRepository.list();
}
