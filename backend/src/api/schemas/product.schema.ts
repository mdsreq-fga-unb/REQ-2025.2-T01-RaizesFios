import { z } from "zod";

// ------------------------------
// US001 - Registrar Produto
// ------------------------------

export const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  sku: z.string(),
  imageUrl: z.string().optional(),
  active: z.boolean().optional(),
  categoryId: z.number()
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
    active: z.string().transform((val) => val === 'true').optional(),
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
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      sku: z.string().optional(),
      imageUrl: z.string().optional(),
      active: z.boolean().optional(),
      categoryId: z.number().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Nenhum campo para atualizar.",
    }),
});
