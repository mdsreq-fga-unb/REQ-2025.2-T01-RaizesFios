import { prisma } from "../../config/db";
import { CreateAddressDTO, UpdateAddressDTO, Address } from "../entities/address.entity";

export class AddressRepository {
  async create(userId: string, data: CreateAddressDTO): Promise<Address> {
    return await prisma.address.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAllByUserId(userId: string): Promise<Address[]> {
    return await prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Address | null> {
    return await prisma.address.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateAddressDTO): Promise<Address> {
    return await prisma.address.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.address.delete({
      where: { id },
    });
  }

  async resetDefaultAddress(userId: string): Promise<void> {
    await prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.address.count({
      where: { userId },
    });
  }
}

