import { Request, Response, NextFunction } from "express";
import userService from "../../domain/services/user.service";
import { registerUserSchema, RegisterUserDTO } from "../schemas/user.schema";

export default {
  async register(req: Request, res: Response, next: NextFunction) {
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
      next(err);
    }
  }
};
