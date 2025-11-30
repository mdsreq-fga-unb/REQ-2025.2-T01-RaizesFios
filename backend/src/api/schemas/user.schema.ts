import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string({ error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório"),

  email: z
    .email("E-mail inválido"),

  password: z
    .string({ error: "Senha é obrigatória" })
    .min(8, "Senha deve ter pelo menos 8 caracteres")
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
