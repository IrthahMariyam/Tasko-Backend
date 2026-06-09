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
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { sendOTP } from "../../../../shared/utils/send.otp.util";
let ResendAdminOtpUseCase = class ResendAdminOtpUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(dto) {
        const email = dto.email.toLowerCase().trim();
        const existing = await this._userRepository.findByEmail(email);
        if (existing)
            throw new ValidationError(ERROR_MESSAGE.USER_ALREADY_EXISTS);
        const data = await redisClient.get(`admin.otp:${email}`);
        if (!data)
            throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED);
        const parsedData = JSON.parse(data);
        const otp = generateOTP();
        await redisClient.setex(`admin.otp:${email}`, 15 * 60, JSON.stringify({
            ...parsedData,
            otp,
        }));
        await sendOTP(email, otp);
        return { message: SUCCESS_MESSAGE.OTP_SENT };
    }
};
ResendAdminOtpUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], ResendAdminOtpUseCase);
export { ResendAdminOtpUseCase };
//# sourceMappingURL=resendadminotp.usecase.js.map