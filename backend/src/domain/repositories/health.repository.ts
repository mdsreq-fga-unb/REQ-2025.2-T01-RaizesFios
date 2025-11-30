import { prisma } from "../../config/db";

export default {
  async checkDatabase() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return "online";
    } catch (error) {
      return "offline";
    }
  }
};
