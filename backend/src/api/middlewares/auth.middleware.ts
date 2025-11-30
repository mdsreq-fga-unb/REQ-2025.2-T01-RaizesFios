import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../domain/types/jwt.types";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    (req as any).userId = decoded.id;
    (req as any).userRole = decoded.role;
    
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
