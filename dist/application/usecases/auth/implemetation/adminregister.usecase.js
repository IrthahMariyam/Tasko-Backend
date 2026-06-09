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
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types.js";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider.js";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message.js";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message.js";
import { hashPassword } from "../../../../shared/utils/password.hash.util.js";
import { generateOTP } from "../../../../shared/utils/otp.generate.util.js";
import { sendOTP } from "../../../../shared/utils/send.otp.util.js";
import { UserRole } from "../../../../domain/enum/user/role.enum.js";
let RegisterAdminUseCase = class RegisterAdminUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(dto) {
        const email = dto.email.toLowerCase().trim();
        const existing = await this._userRepository.findByEmail(email);
        if (existing)
            throw new Error(ERROR_MESSAGE.USER_ALREADY_EXISTS);
        const hashed = await hashPassword(dto.password);
        const otp = generateOTP();
        await redisClient.setex(`admin.otp:${email}`, 15 * 60, JSON.stringify({
            name: dto.name,
            email,
            password: hashed,
            role: UserRole.ADMIN,
            otp
        }));
        await sendOTP(email, otp);
        console.log(otp);
        return {
            message: SUCCESS_MESSAGE.OTP_SENT,
        };
    }
};
RegisterAdminUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], RegisterAdminUseCase);
export { RegisterAdminUseCase };
//# sourceMappingURL=adminregister.usecase.js.map