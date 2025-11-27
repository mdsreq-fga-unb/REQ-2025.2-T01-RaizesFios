import { prisma } from '../../config/db';
import { ProductData } from '../../api/schemas/product.schema';

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