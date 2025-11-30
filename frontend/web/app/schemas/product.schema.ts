import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  sku: z.string().min(1, "SKU é obrigatório"),
  imageUrl: z.string().optional(),
  active: z.boolean().default(true),
  categoryId: z.coerce.number().min(1, "Selecione uma categoria"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
