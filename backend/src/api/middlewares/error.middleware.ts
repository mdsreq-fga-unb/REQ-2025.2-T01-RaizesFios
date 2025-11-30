import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/app.error";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ ERRO:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    
    return res.status(422).json({
      message: "Erro de validação",
      errors: formattedErrors,
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
};
