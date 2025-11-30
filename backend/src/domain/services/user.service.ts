import bcrypt from "bcryptjs";
import { CreateUserDTO, Role } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";
import { ConflictError } from "../errors/conflict.error";

export default {
  async register(data: CreateUserDTO) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
      role: Role.USER
    });

    return user;
  }
};
