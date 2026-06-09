import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  update(user: User): Promise<User>;

}