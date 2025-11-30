import { prisma } from "../../config/db";

export default {
  async create(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt
      }
    });
  },

  async findByToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true }
    });
  },

  async delete(token: string) {
    return prisma.refreshToken.delete({
      where: { token }
    });
  },

  async deleteByUser(userId: string) {
    return prisma.refreshToken.deleteMany({
      where: { userId }
    });
  }
};

