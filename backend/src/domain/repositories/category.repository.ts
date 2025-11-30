import { prisma } from "../../config/db";
import { CategoryData } from "../../api/schemas/category.schema";

export default {
  async create(data: CategoryData) {
    return prisma.category.create({
      data: {
        name: data.name,
      },
    });
  },

  async list() {
    return prisma.category.findMany();
  },
};
