import { Role } from "@prisma/client";

export { Role };

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  createdAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
