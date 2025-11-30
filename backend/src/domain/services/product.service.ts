import { prisma } from '../../config/db';
import { ProductData } from '../../api/schemas/product.schema';

// ---------------------
// US001 - Criar Produto
// ---------------------
export async function createProduct(productData: ProductData) {
  const newProduct = await prisma.produto.create({
    data: {
      nome: productData.nome,
      descricao: productData.descricao,
      preco: productData.preco,
      sku: productData.sku,
      imagemUrl: productData.imagemUrl,
      ativo: productData.ativo,
      categoria: {
        connect: { id: productData.categoriaId },
      },
    },
  });

  return newProduct;
}

// ---------------------------
// US002 - Consultar Produto
// ---------------------------

// Buscar por ID
export async function getProductById(id: number) {
  const product = await prisma.produto.findUnique({
    where: { id },
    include: {
      categoria: true, // Se quiser trazer dados da categoria junto
    },
  });

  return product;
}

// Buscar produtos com filtro
export async function searchProducts(search?: string) {
  const products = await prisma.produto.findMany({
    where: search
      ? {
          nome: {
            contains: search,
            mode: 'insensitive', // busca case-insensitive
          },
        }
      : {},
    include: {
      categoria: true,
    },
    orderBy: { nome: 'asc' },
  });

  return products;
}