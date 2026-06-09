import { IUserRepository } from "../../../domain/interfaces/IUserRepository.js";
import { User } from "../../../domain/entities/User.js";
export declare class UserRepository implements IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
}
