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
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
let ResetPasswordUseCase = class ResetPasswordUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, newPassword, confirmPassword }) {
        if (newPassword !== confirmPassword)
            throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH);
        const normalizedEmail = email.toLowerCase().trim();
        if (await redisClient.get(`forgot-reset:${normalizedEmail}`) !== "verified")
            throw new ValidationError("Verify the OTP before resetting your password.");
        const user = await this.userRepository.findByEmail(normalizedEmail);
        if (!user)
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
        if (user.role === UserRole.ADMIN)
            throw new ValidationError("Admins can't change their password.");
        await this.userRepository.update(User.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: await hashPassword(newPassword),
            role: user.role,
            status: user.status,
            isVerified: user.isVerified,
        }));
        await redisClient.del(`forgot-reset:${normalizedEmail}`);
        return { message: "Password reset successfully" };
    }
};
ResetPasswordUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], ResetPasswordUseCase);
export { ResetPasswordUseCase };
//# sourceMappingURL=reset.password.usecase.js.map