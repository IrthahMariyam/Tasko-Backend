import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { Model } from "mongoose";
import { UserPersistenceMapper } from "../../../mappers/user.mapper";
import { IUser } from "../../interface/user.interface";
import { BaseRepository } from '../implements/base.repository';
export declare class UserRepository extends BaseRepository<User> implements IUserRepository {
    private readonly _userMapper;
    constructor(model: Model<IUser>, _userMapper: UserPersistenceMapper);
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
}
