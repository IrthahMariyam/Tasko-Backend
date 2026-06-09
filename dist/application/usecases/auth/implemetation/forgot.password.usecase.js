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
import { injectable, inject } from "inversify";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { generateOTP } from "../../../../shared/utils/otp.generate.util";
import { redisClient } from "../../../../infrastructure/providers/redis/redis.provider";
import { sendOTP } from "../../../../shared/utils/send.otp.util";
let ForgotPasswordUseCase = class ForgotPasswordUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute({ email }) {
        const existing = this._userRepository.findByEmail(email);
        if (!existing)
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
        const otp = generateOTP();
        const expiryTime = 5 * 60;
        await redisClient.setex(`forgot-otp:${email}`, expiryTime, JSON.stringify({ otp }));
        console.log(email, otp);
        await sendOTP(email, otp);
        return {
            message: 'forgot password otp is sended'
        };
    }
};
ForgotPasswordUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], ForgotPasswordUseCase);
export { ForgotPasswordUseCase };
//# sourceMappingURL=forgot.password.usecase.js.map