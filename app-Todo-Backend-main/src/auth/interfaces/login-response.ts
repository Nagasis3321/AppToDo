import { User } from "../entities/user.entity";

export interface LoginResponse {
  user: {
    email: string;
    name: string;
    isActive: boolean;
    roles: string[];
  };
  token: string;
}
