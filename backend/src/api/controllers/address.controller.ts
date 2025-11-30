import { Request, Response, NextFunction } from "express";
import { AddressService } from "../../domain/services/address.service";
import { createAddressSchema, updateAddressSchema } from "../schemas/address.schema";

class AddressController {
  private addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id; // Assumindo que o middleware de auth adiciona user ao req
      if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

      const data = createAddressSchema.parse(req.body);
      const address = await this.addressService.create(userId, data);

      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

      const addresses = await this.addressService.list(userId);
      res.json(addresses);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const { id } = req.params;
      if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

      const data = updateAddressSchema.parse(req.body);
      const address = await this.addressService.update(userId, id, data);

      res.json(address);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const { id } = req.params;
      if (!userId) return res.status(401).json({ message: "Usuário não autenticado" });

      await this.addressService.delete(userId, id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default new AddressController();

