import productRepository from '../repositories/product.repository';
import { ProductData } from '../../api/schemas/product.schema';

// ---------------------
// US001 - Criar Produto
// ---------------------
export async function createProduct(productData: ProductData) {
  return productRepository.create(productData);
}

// ---------------------------
// US002 - Consultar Produto
// ---------------------------

// Buscar por ID
export async function getProductById(id: number) {
  return productRepository.findById(id);
}

// Buscar produtos com filtro
export async function searchProducts(search?: string, onlyActive?: boolean) {
  return productRepository.search(search, onlyActive);
}

// ---------------------------
// US003 - Excluir Produto
// ---------------------------

export async function deleteProduct(id: number) {
  return productRepository.delete(id);
}

// ------------------------------
// Adicionei Atualizar Produto
// ------------------------------

export async function updateProduct(id: number, data: any) {
  const exists = await productRepository.findById(id);

  if (!exists) return null;

  return productRepository.update(id, data);
}
