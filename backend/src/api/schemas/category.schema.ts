import { z } from "zod";

export const categorySchema = z.object({
  nome: z.string().min(1, "Nome da categoria é obrigatório"),
});

export type CategoryData = z.infer<typeof categorySchema>;