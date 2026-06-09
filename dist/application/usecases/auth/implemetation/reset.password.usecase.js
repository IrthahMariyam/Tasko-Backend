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
import { ERROR_MESSAGE } from "../../../../shared/constants/messages/error.message";
import { SUCCESS_MESSAGE } from "../../../../shared/constants/messages/success.message";
import { NotFoundError } from "../../../../shared/utils/error-handling/errors/not.found.error";
import { ValidationError } from "../../../../shared/utils/error-handling/errors/validation.error";
import { User } from "../../../../domain/entities/User";
import { hashPassword } from "../../../../shared/utils/password.hash.util";
import { InternalLServerError } from "../../../../shared/utils/error-handling/errors/internal.server.error";
let ResetPasswordUseCase = class ResetPasswordUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute({ email, newPassword, confirmPassword }) {
        if (newPassword !== confirmPassword) {
            throw new ValidationError(ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH);
        }
        const user = await this._userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND);
        }
        const hashedPassword = await hashPassword(newPassword);
        const newData = User.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            role: user.role,
            status: user.status,
            isVerified: true,
        });
        const result = await this._userRepository.update(newData);
        if (!result) {
            throw new InternalLServerError(ERROR_MESSAGE.SERVER_ERROR);
        }
        return { message: SUCCESS_MESSAGE.PASSWORD_RESET };
    }
};
ResetPasswordUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], ResetPasswordUseCase);
export { ResetPasswordUseCase };
//# sourceMappingURL=reset.password.usecase.js.map