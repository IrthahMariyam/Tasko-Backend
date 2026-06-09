import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { Model } from "mongoose";
import { UserPersistenceMapper } from "../../../mappers/user.mapper";
import { IUser } from "../../interface/user.interface"; 
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../../di/types/user/user.types"; 
import { BaseRepository } from '../implements/base.repository';

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository{
    constructor(
        @inject(USER_TYPES.userModel) 
       model: Model<IUser>,
        @inject(USER_TYPES.UserPersistenceMapper) 
        private readonly _userMapper: UserPersistenceMapper,
    
    ){
        super(model as unknown as Model<User>)
    }
    
   
    async findByEmail(email: string): Promise<User | null> {
        const doc = await this.findOne({email: email.toLowerCase().trim()})
        return doc? this._userMapper.fromMongo(doc):null
    }

    async create(user: User): Promise<User> {
        const doc = await this.model.create(this._userMapper.toPersistence(user))
        return this._userMapper.fromMongo(doc)
    }

    async findById(id: string): Promise<User | null> {
        const doc = await this.model.findById(id)
        return doc ? this._userMapper.fromMongo(doc) : null
    }

    async findAll(): Promise<User[]> {
        const docs = await this.model.find()
        return docs.map((doc) => this._userMapper.fromMongo(doc))
    }

    async update(user: User): Promise<User> {
        const doc = await this.model.findByIdAndUpdate(
            user.id,
            this._userMapper.toPersistence(user),
            { new: true }
        )

        if (!doc) {
            throw new Error("User not found")
        }

        return this._userMapper.fromMongo(doc)
    }

}
