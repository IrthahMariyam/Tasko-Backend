import { User } from "../../domain/entities/User";
import { UserRole } from "../../domain/enum/user/role.enum";
import { UserStatus } from "../../domain/enum/user/status.enum";

export class UserPersistenceMapper {
  toMongo(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      designation: user.designation,
      joiningDate: user.joiningDate,
      profileImage: user.profileImage,
      status: user.status,
      isVerified: user.isVerified,
    };
  }

  toPersistence(user: User) {
    return this.toMongo(user);
  }

  fromMongo(doc: any): User {
    return User.create({
      id: doc._id?.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: (doc.role ?? UserRole.USER) as UserRole,
      designation: doc.designation ?? "",
      joiningDate: doc.joiningDate ? new Date(doc.joiningDate) : new Date(),
      profileImage: doc.profileImage ?? "",
      status: (doc.status ?? "active") as UserStatus,
      isVerified: doc.isVerified ?? false,
    });
  }
}

export const UserMapper = new UserPersistenceMapper();
