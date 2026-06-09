import {User} from '../../domain/entities/User'
import { UserStatus } from '../../domain/enum/user/status.enum';

export class UserPersistenceMapper {
    toMongo(user: User){
        return {
           name: user.name,
           email: user.email,
           password: user.password,
           role: user.role,
           status: user.status,
           isVerified:user.isVerified,
        }
    }

    toPersistence(user: User) {
        return this.toMongo(user)
    }

    fromMongo(doc: any): User {
        return User.create({
            id: doc._id?.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            role: doc.role,
            status: (doc.status ?? 'active') as UserStatus,
            isVerified: doc.isVerified ?? false,
        })
    }

   
}

export const UserMapper = new UserPersistenceMapper();
