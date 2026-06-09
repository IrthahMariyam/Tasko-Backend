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
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { comparePassword } from "../../../../shared/utils/password.hash.util";
import { generateRefreshToken, generateAccessToken } from "../../../../shared/utils/jwt.utils";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
let LoginUseCase = class LoginUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(dto) {
        const email = dto.email.toLowerCase().trim();
        const user = await this._userRepository.findByEmail(email);
        if (!user)
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
        if (!user.isVerified)
            throw new Error(ERROR_MESSAGE.USER_NOT_VERIFIED_OR_BLOCKED);
        const isPassword = await comparePassword(dto.password, user.password);
        if (!isPassword)
            throw new ValidationError(ERROR_MESSAGE.INVALID_PASSWORD);
        const payload = { id: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        await redisClient.set(`refresh:${user.email}`, refreshToken, "EX", REFRESH_TOKEN_TTL_SECONDS);
        return {
            message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
            accessToken,
            refreshToken,
            user: {
                id: user.id?.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        };
    }
};
LoginUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], LoginUseCase);
export { LoginUseCase };
//# sourceMappingURL=login.usecase.js.map