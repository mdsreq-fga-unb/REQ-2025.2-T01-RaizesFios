import { z } from "zod";

export const createAddressSchema = z.object({
  recipientName: z.string().min(3, "Nome do destinatário deve ter no mínimo 3 caracteres"),
  phone: z.string().min(10, "Telefone deve ter no mínimo 10 caracteres"),
  street: z.string().min(3, "Rua deve ter no mínimo 3 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  referencePoint: z.string().optional(),
  district: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "UF deve ter 2 caracteres"),
  zipCode: z.string().length(8, "CEP deve ter 8 caracteres (apenas números)"),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
