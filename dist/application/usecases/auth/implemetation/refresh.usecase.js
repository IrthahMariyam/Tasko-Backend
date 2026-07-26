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
import { verifyToken, generateAccessToken } from "../../../../shared/utils/jwt.utils";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { UnauthorizedError } from "../../../../shared/utils/error-handling/errors/unauthorized.error";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
let RefreshUseCase = class RefreshUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedError("Refresh token is required");
        }
        const decoded = verifyToken(refreshToken, 'refresh');
        if (!decoded) {
            throw new UnauthorizedError("Invalid or expired refresh token");
        }
        // Check if the refresh token matches what we have in Redis
        const storedToken = await redisClient.get(`refresh:${decoded.email}`);
        if (!storedToken || storedToken !== refreshToken) {
            throw new UnauthorizedError("Refresh token has been invalidated or expired");
        }
        const user = await this._userRepository.findByEmail(decoded.email);
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
        }
        if (!user.isVerified) {
            throw new UnauthorizedError(ERROR_MESSAGE.USER_NOT_VERIFIED_OR_BLOCKED);
        }
        const payload = { id: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        return {
            message: "Token refreshed successfully",
            accessToken
        };
    }
};
RefreshUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], RefreshUseCase);
export { RefreshUseCase };
//# sourceMappingURL=refresh.usecase.js.map