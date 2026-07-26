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
import { inject, injectable } from "inversify";
import { User } from "../../../../domain/entities/User";
import { UserStatus } from "../../../../domain/enum/user/status.enum";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
let SetPasswordUseCase = class SetPasswordUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(token, password, confirmPassword) {
        if (password !== confirmPassword)
            throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH);
        const key = `member.invite:${token}`;
        const invitation = await redisClient.get(key);
        if (!invitation)
            throw new NotFoundError(ERROR_MESSAGE.INVITATION_EXPIRED_OR_INVALID);
        const { name, email, role } = JSON.parse(invitation);
        if (await this.userRepository.findByEmail(email))
            throw new ValidationError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
        await this.userRepository.create(User.create({
            name,
            email,
            password: await hashPassword(password),
            role,
            status: UserStatus.ACTIVE,
            isVerified: true,
        }));
        await redisClient.del(key);
        return { message: "Password set successfully. You can now log in." };
    }
};
SetPasswordUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], SetPasswordUseCase);
export { SetPasswordUseCase };
//# sourceMappingURL=set.password.usecase.js.map