import { z } from "zod";

// ------------------------------
// US001 - Registrar Produto
// ------------------------------

export const productSchema = z.object({
  nome: z.string(),
  descricao: z.string().optional(),
  preco: z.number(),
  sku: z.string(),
  imagemUrl: z.string().optional(),
  ativo: z.boolean().optional(),
  categoriaId: z.number()
});

// Tipo gerado automaticamente
export type ProductData = z.infer<typeof productSchema>;

// ------------------------------
// US002 - Consultar Produto
// ------------------------------

// GET /products/:id
export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
});

// GET /products?search=abc
export const searchProductsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
  }),
});

// ------------------------------
// US003 - Excluir Produto
// ------------------------------

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
});

// ------------------------------
// Adicionei Atualizar Produto
// ------------------------------
export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
  body: z
    .object({
      nome: z.string().optional(),
      descricao: z.string().optional(),
      preco: z.number().optional(),
      sku: z.string().optional(),
      imagemUrl: z.string().optional(),
      ativo: z.boolean().optional(),
      categoriaId: z.number().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Nenhum campo para atualizar.",
    }),
});