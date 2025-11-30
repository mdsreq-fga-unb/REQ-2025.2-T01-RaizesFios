import { Request, Response, NextFunction } from "express";
import authService from "../../domain/services/auth.service";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export default {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: "Email e senha são obrigatórios" });
      }

      const { accessToken, refreshToken, user } = await authService.login(email, password);

      // Envia Refresh Token via Cookie HttpOnly
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: IS_PRODUCTION, // Só envia via HTTPS em produção
        sameSite: "strict", // Protege contra CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
      });

      return res.status(200).json({ accessToken, user });
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;      
      const { accessToken } = await authService.refresh(refreshToken);

      return res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (err) {
      next(err);
    }
  }
};
