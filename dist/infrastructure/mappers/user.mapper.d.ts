import { User } from '../../domain/entities/User';
import { UserStatus } from '../../domain/enum/user/status.enum';
export declare class UserPersistenceMapper {
    toMongo(user: User): {
        name: string;
        email: string;
        password: string;
        role: import("../../domain/enum/user/role.enum").UserRole;
        status: UserStatus;
        isVerified: boolean;
    };
    toPersistence(user: User): {
        name: string;
        email: string;
        password: string;
        role: import("../../domain/enum/user/role.enum").UserRole;
        status: UserStatus;
        isVerified: boolean;
    };
    fromMongo(doc: any): User;
}
export declare const UserMapper: UserPersistenceMapper;
