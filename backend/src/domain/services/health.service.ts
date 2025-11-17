import healthRepository from "../repositories/health.repository";

export default {
  async check() {
    const database = await healthRepository.checkDatabase();
    return {
      api: "online",
      database
    };
  }
};
