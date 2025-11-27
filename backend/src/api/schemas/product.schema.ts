import { z } from "zod";

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