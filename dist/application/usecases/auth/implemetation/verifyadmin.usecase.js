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
import { inject, injectable } from 'inversify';
import { USER_TYPES } from '../../../../infrastructure/di/types/user/user.types';
import { redisClient } from '../../../../infrastructure/providers/redis/redis.provider';
import { NotFoundError } from '../../../../shared/utils/error-handling/errors/not.found.error';
import { ERROR_MESSAGE } from '../../../../shared/constants/messages/error.message';
import { SUCCESS_MESSAGE } from '../../../../shared/constants/messages/success.message';
import { ValidationError } from '../../../../shared/utils/error-handling/errors/validation.error';
import { User } from '../../../../domain/entities/User';
import { UserRole } from '../../../../domain/enum/user/role.enum';
import { UserStatus } from '../../../../domain/enum/user/status.enum';
import { InternalLServerError } from '../../../../shared/utils/error-handling/errors/internal.server.error';
let VerifyOtpUseCase = class VerifyOtpUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(dto) {
        const email = dto.email.toLowerCase().trim();
        const data = await redisClient.get(`admin.otp:${email}`);
        if (!data)
            throw new NotFoundError(ERROR_MESSAGE.OTP_EXPIRED);
        const parsedData = JSON.parse(data);
        if (parsedData.otp.toString() !== dto.otp.toString()) {
            throw new ValidationError(ERROR_MESSAGE.INVALID_OTP);
        }
        const existing = await this._userRepository.findByEmail(email);
        if (existing)
            throw new ValidationError(ERROR_MESSAGE.USER_ALREADY_EXISTS);
        const admin = User.create({
            name: parsedData.name,
            email: parsedData.email,
            password: parsedData.password,
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
            isVerified: true,
        });
        console.log(`admin:${admin}`);
        const adminSaved = await this._userRepository.create(admin);
        if (!adminSaved)
            throw new InternalLServerError('Failed to create admin');
        await redisClient.del(`admin.otp:${email}`);
        return { message: SUCCESS_MESSAGE.ADMIN_REGISTERED,
            user: {
                id: adminSaved.id?.toString(),
                name: adminSaved.name,
                email: adminSaved.email
            } };
    }
};
VerifyOtpUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], VerifyOtpUseCase);
export { VerifyOtpUseCase };
//# sourceMappingURL=verifyadmin.usecase.js.map