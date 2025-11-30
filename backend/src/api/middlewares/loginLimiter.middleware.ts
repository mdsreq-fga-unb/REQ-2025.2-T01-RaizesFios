import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite estrito de 5 tentativas por IP
  standardHeaders: true, // Retorna info de limite nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilita os headers `X-RateLimit-*` 
  
  // Mensagem personalizada em JSON
  handler: (req: Request, res: Response, next, options) => {
    res.status(options.statusCode).json({
      message: "Muitas tentativas de login. Por favor, tente novamente em 15 minutos."
    });
  },
  
  skipSuccessfulRequests: false, 
});

