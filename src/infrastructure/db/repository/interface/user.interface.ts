import { User } from "../../../../domain/entities/User";

export interface IUserRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
