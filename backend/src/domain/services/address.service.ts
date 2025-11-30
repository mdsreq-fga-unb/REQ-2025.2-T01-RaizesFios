import { AddressRepository } from "../repositories/address.repository";
import { CreateAddressDTO, UpdateAddressDTO, Address } from "../entities/address.entity";
import { AppError } from "../errors/app.error";

export class AddressService {
  private addressRepository: AddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  async create(userId: string, data: CreateAddressDTO): Promise<Address> {
    // Se for o primeiro endereço ou se for marcado como default, reseta os outros
    const count = await this.addressRepository.countByUserId(userId);
    
    if (count === 0) {
      data.isDefault = true; // Primeiro endereço é sempre padrão
    } else if (data.isDefault) {
      await this.addressRepository.resetDefaultAddress(userId);
    }

    return await this.addressRepository.create(userId, data);
  }

  async list(userId: string): Promise<Address[]> {
    return await this.addressRepository.findAllByUserId(userId);
  }

  async update(userId: string, addressId: string, data: UpdateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError("Endereço não encontrado", 404);
    }

    if (address.userId !== userId) {
      throw new AppError("Acesso negado", 403);
    }

    if (data.isDefault) {
      await this.addressRepository.resetDefaultAddress(userId);
    }

    return await this.addressRepository.update(addressId, data);
  }

  async delete(userId: string, addressId: string): Promise<void> {
    const address = await this.addressRepository.findById(addressId);

    if (!address) {
      throw new AppError("Endereço não encontrado", 404);
    }

    if (address.userId !== userId) {
      throw new AppError("Acesso negado", 403);
    }

    await this.addressRepository.delete(addressId);
  }
}

