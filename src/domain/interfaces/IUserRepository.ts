import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  findWithQuery(opts: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<{ items: User[]; total: number }>;

  update(user: User): Promise<User>;
}
