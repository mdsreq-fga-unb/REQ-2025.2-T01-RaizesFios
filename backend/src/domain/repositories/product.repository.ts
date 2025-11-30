import { prisma } from "../../config/db";
import { ProductData } from "../../api/schemas/product.schema";

export default {
  async create(data: ProductData) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sku: data.sku,
        imageUrl: data.imageUrl,
        active: data.active,
        category: {
          connect: { id: data.categoryId },
        },
      },
    });
  },

  async findById(id: number) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  },

  async search(search?: string, onlyActive?: boolean) {
    const whereClause: any = {};

    if (search) {
      whereClause.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (onlyActive) {
      whereClause.active = true;
    }

    return prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: { name: "asc" },
    });
  },

  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  },

  async update(id: number, data: any) {
    return prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sku: data.sku,
        imageUrl: data.imageUrl,
        active: data.active,
        categoryId: data.categoryId,
      },
    });
  },
};
