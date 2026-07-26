import { inject, injectable } from "inversify";
import { IRefreshUseCase } from "../interface/refresh.interface";
import { RefreshResult } from "../../../../domain/types/refresh.types";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { verifyToken, generateAccessToken } from "../../../../shared/utils/jwt.utils";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { UnauthorizedError } from "../../../../shared/utils/error-handling/errors/unauthorized.error";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";

@injectable()
export class RefreshUseCase implements IRefreshUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository) private readonly _userRepository: IUserRepository
    ) {}

    async execute(refreshToken: string): Promise<RefreshResult> {
        if (!refreshToken) {
            throw new UnauthorizedError(ERROR_MESSAGE.REFRESH_TOKEN_REQUIRED);
        }

        const decoded = verifyToken(refreshToken, 'refresh') as { id: string; email: string; role: string } | undefined;
        if (!decoded) {
            throw new UnauthorizedError(ERROR_MESSAGE.INVALID_REFRESH_TOKEN);
        }

        // Check if the refresh token matches what we have in Redis
        const storedToken = await redisClient.get(`refresh:${decoded.email}`);
        if (!storedToken || storedToken !== refreshToken) {
            throw new UnauthorizedError(ERROR_MESSAGE.REFRESH_TOKEN_INVALIDATED);
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
            message: SUCCESS_MESSAGE.TOKEN_REFRESHED_SUCCESS,
            accessToken
        };
    }
}
