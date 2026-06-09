var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Model } from "mongoose";
import { UserPersistenceMapper } from "../../../mappers/user.mapper";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../../di/types/user/user.types";
import { BaseRepository } from '../implements/base.repository';
let UserRepository = class UserRepository extends BaseRepository {
    _userMapper;
    constructor(model, _userMapper) {
        super(model);
        this._userMapper = _userMapper;
    }
    async findByEmail(email) {
        const doc = await this.findOne({ email: email.toLowerCase().trim() });
        return doc ? this._userMapper.fromMongo(doc) : null;
    }
    async create(user) {
        const doc = await this.model.create(this._userMapper.toPersistence(user));
        return this._userMapper.fromMongo(doc);
    }
    async findById(id) {
        const doc = await this.model.findById(id);
        return doc ? this._userMapper.fromMongo(doc) : null;
    }
    async findAll() {
        const docs = await this.model.find();
        return docs.map((doc) => this._userMapper.fromMongo(doc));
    }
    async update(user) {
        const doc = await this.model.findByIdAndUpdate(user.id, this._userMapper.toPersistence(user), { new: true });
        if (!doc) {
            throw new Error("User not found");
        }
        return this._userMapper.fromMongo(doc);
    }
};
UserRepository = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.userModel)),
    __param(1, inject(USER_TYPES.UserPersistenceMapper)),
    __metadata("design:paramtypes", [Model,
        UserPersistenceMapper])
], UserRepository);
export { UserRepository };
//# sourceMappingURL=user.repository.js.map