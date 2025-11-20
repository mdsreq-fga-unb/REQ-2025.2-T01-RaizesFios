import { prisma } from "../../config/db"
import { CreateUserDTO } from "../entities/user.entity"

export default {
    async findByEmail(email: string){
        return prisma.user.findUnique({
            where: {email}
        });
    },

    async create(data: CreateUserDTO){
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        });
    }
};