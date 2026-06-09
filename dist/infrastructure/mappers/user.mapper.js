import { User } from '../../domain/entities/User';
export class UserPersistenceMapper {
    toMongo(user) {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            status: user.status,
            isVerified: user.isVerified,
        };
    }
    toPersistence(user) {
        return this.toMongo(user);
    }
    fromMongo(doc) {
        return User.create({
            id: doc._id?.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            role: doc.role,
            status: (doc.status ?? 'active'),
            isVerified: doc.isVerified ?? false,
        });
    }
}
export const UserMapper = new UserPersistenceMapper();
//# sourceMappingURL=user.mapper.js.map