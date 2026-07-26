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
import { UserRole } from "../../../../domain/enum/user/role.enum";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { sendOTP } from "../../../../shared/utils/send.otp.util";
let ForgotPasswordUseCase = class ForgotPasswordUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email }) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.userRepository.findByEmail(normalizedEmail);
        if (!user)
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
        if (user.role === UserRole.ADMIN)
            throw new ValidationError("Admins can't change their password.");
        const otp = generateOTP();
        await redisClient.set(`forgot-otp:${normalizedEmail}`, otp, "EX", 15 * 60);
        await sendOTP(normalizedEmail, otp);
        return { message: "OTP sent to your email" };
    }
};
ForgotPasswordUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], ForgotPasswordUseCase);
export { ForgotPasswordUseCase };
//# sourceMappingURL=forgot.password.usecase.js.map