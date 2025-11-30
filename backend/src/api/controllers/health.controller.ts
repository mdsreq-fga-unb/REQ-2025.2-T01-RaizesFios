import { Request, Response } from "express";
import healthService from "../../domain/services/health.service";

export default {
  async check(req: Request, res: Response) {
    const status = await healthService.check();
    return res.json(status);
  }
};
