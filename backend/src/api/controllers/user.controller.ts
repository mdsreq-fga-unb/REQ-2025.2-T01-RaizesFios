import { Request, Response } from "express";
import userService from "../../domain/services/user.service";
import { ConflictError } from "../../domain/errors/conflict.error";
import { registerUserSchema, RegisterUserDTO } from "../schemas/user.schema";
import z, { ZodError } from "zod";

export default {
  async register(req: Request, res: Response) {
    try {
      const parsed: RegisterUserDTO = registerUserSchema.parse(req.body);

      const user = await userService.register(parsed);

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err) {

      if (err instanceof ZodError){
        return res.status(422).json({message: z.flattenError(err)})
      }

      if (err instanceof ConflictError) {
        return res.status(409).json({ message: err.message});
      }

      console.error("ERRO NO REGISTER:", err)

      return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  }
};
