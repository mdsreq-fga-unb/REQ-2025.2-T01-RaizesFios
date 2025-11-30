import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

