import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import userRepository from "../repositories/user.repository";
import refreshTokenRepository from "../repositories/refreshToken.repository";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { TokenPayload } from "../types/jwt.types";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
// Casting explícito para garantir compatibilidade com SignOptions['expiresIn']
const ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY || "15m") as jwt.SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS) || 7;

export default {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const payload: TokenPayload = {
      id: user.id,
      role: user.role
    };

    const signOptions: SignOptions = {
      expiresIn: ACCESS_TOKEN_EXPIRY
    };

    // 1. Gerar Access Token (JWT) - Curta duração
    const accessToken = jwt.sign(
      { ...payload },
      JWT_SECRET,
      signOptions
    );

    // 2. Gerar Refresh Token (Opaque) - Longa duração
    const refreshToken = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    await refreshTokenRepository.create(user.id, refreshToken, expiresAt);

    const { password: _, ...userWithoutPassword } = user;

    return { accessToken, refreshToken, user: userWithoutPassword };
  },

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token não fornecido");
    }

    const storedToken = await refreshTokenRepository.findByToken(refreshToken);

    if (!storedToken) {
      throw new UnauthorizedError("Refresh token inválido");
    }

    if (storedToken.expiresAt < new Date()) {
      await refreshTokenRepository.delete(refreshToken);
      throw new UnauthorizedError("Refresh token expirado");
    }

    // Gerar novo Access Token
    const payload: TokenPayload = {
      id: storedToken.user.id,
      role: storedToken.user.role
    };

    const signOptions: SignOptions = {
      expiresIn: ACCESS_TOKEN_EXPIRY
    };

    const newAccessToken = jwt.sign(
      { ...payload },
      JWT_SECRET,
      signOptions
    );

    // Opcional: Rotacionar Refresh Token (emitir um novo e deletar o velho)
    // Para simplicidade, vamos manter o mesmo até expirar, ou você pode implementar rotação aqui.
    
    return { accessToken: newAccessToken };
  },

  async logout(refreshToken: string) {
    if (refreshToken) {
      await refreshTokenRepository.delete(refreshToken);
    }
  }
};
