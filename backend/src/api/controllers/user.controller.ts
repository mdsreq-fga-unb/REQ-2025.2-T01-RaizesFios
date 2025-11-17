import { Request, Response } from "express";
import userService from "../../domain/services/user.service";
import { ConflictError } from "../../domain/errors/conflict.error";

type RegisterBody = {
  name?: string;
  email?: string;
  password?: string;
};

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateRegisterBody(body: RegisterBody): asserts body is Required<RegisterBody> {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw new ValidationError("Campos obrigatórios: name, email, password");
  }

  const emailOk = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  if (!emailOk) throw new ValidationError("E-mail inválido");

  if (password.length < 8) throw new ValidationError("Senha deve ter pelo menos 8 caracteres");
}

export default {
  async register(req: Request, res: Response) {
    try {
      const body = req.body as RegisterBody;

      validateRegisterBody(body);

      const { name, email, password } = body;

      const user = await userService.register({ name, email, password });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err: unknown) {
      const safeMessage = err instanceof Error ? err.message : "Erro desconhecido";

      if (err instanceof ValidationError) {
        return res.status(422).json({ message: safeMessage });
      }

      if (err instanceof ConflictError) {
        return res.status(409).json({ message: safeMessage});
      }

      console.error("ERRO NO REGISTER:", err)

      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  }
};
