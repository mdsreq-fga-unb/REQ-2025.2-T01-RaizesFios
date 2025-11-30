import express from "express";
import routes from "./api/routes";
import logger from "./api/middlewares/logger";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import { errorMiddleware } from "./api/middlewares/error.middleware";

const app = express();

// Segurança: Headers HTTP
app.use(helmet());

// Configuração do CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Importante para cookies (Refresh Token)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Segurança: Limitação de taxa (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100, // Limite de 100 requisições por IP
  message: "Muitas requisições deste IP, tente novamente mais tarde."
});
app.use(limiter);

// Middlewares Padrão
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api", routes);

// Middleware de Erro
app.use(errorMiddleware);

export default app;
