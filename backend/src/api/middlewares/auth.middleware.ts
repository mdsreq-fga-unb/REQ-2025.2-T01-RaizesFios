import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../domain/types/jwt.types";
import { AppError } from "../../domain/errors/app.error";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Token não fornecido", 401);
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2) {
    throw new AppError("Token mal formatado", 401);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError("Token mal formatado", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    return next();
  } catch (err) {
    throw new AppError("Token inválido ou expirado", 401);
  }
};
