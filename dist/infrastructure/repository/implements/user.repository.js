import { UserModel } from "../../db/models/user.model.js";
import { UserMapper } from "../../mappers/user.mapper.js";
export class UserRepository {
    async create(user) {
        const data = UserMapper.toPersistence(user);
        const created = await UserModel.create(data);
        return UserMapper.toDomain(created);
    }
    async findByEmail(email) {
        const user = await UserModel.findOne({ email });
        if (!user)
            return null;
        return UserMapper.toDomain(user);
    }
    async findById(id) {
        const user = await UserModel.findById(id);
        if (!user)
            return null;
        return UserMapper.toDomain(user);
    }
    async findAll() {
        const users = await UserModel.find();
        return users.map(UserMapper.toDomain);
    }
    async update(user) {
        const updated = await UserModel.findByIdAndUpdate(user.id, UserMapper.toPersistence(user), { new: true });
        if (!updated)
            throw new Error("User not found");
        return UserMapper.toDomain(updated);
    }
}
//# sourceMappingURL=user.repository.js.map