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
import { injectable, inject } from 'inversify';
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { User } from "../../../../domain/entities/User";
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../../domain/enum/user/status.enum";
let SetPasswordUseCase = class SetPasswordUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(token, password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH);
        }
        const inviteKey = `member.invite:${token}`;
        const data = await redisClient.get(inviteKey);
        if (!data) {
            throw new NotFoundError(ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID);
        }
        const parsedData = JSON.parse(data);
        const existing = await this._userRepository.findByEmail(parsedData.email);
        if (existing) {
            throw new ValidationError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
        }
        const hashedPassword = await hashPassword(password);
        const user = User.create({
            name: parsedData.name,
            email: parsedData.email,
            password: hashedPassword,
            role: parsedData.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER,
            status: UserStatus.ACTIVE,
            isVerified: true,
        });
        await this._userRepository.create(user);
        await redisClient.del(inviteKey);
        return { message: SUCCESS_MESSAGE.USER_CREATED };
    }
};
SetPasswordUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], SetPasswordUseCase);
export { SetPasswordUseCase };
//# sourceMappingURL=set.password.usecase.js.map