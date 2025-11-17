import bcrypt from "bcryptjs";
import { CreateUserDTO } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";
import { ConflictError } from "../errors/conflict.error";

export default {
  async register(data: CreateUserDTO) {
    try {
      const existingUser = await userRepository.findByEmail(data.email);

      if (existingUser) {
        throw new ConflictError("E-mail já cadastrado");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await userRepository.create({
        ...data,
        password: hashedPassword
      });

      return user;
  } catch (error){
    console.error("ERRO NO SERVICE:", error)
    throw error;
  }
  }
};
