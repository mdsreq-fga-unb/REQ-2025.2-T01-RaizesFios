import { Role } from "../entities/user.entity";

export interface TokenPayload {
  id: string;
  role: Role;
  iat?: number;
  exp?: number;
}

