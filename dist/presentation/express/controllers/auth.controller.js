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
import { AUTH_TYPES } from "../../../infrastructure/di/types/auth/auth.types";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status";
let AuthController = class AuthController {
    loginUseCase;
    logoutUseCase;
    setPasswordUseCase;
    forgotPasswordUseCase;
    verifyForgotOtpUseCase;
    resetPasswordUseCase;
    refreshUseCase;
    constructor(loginUseCase, logoutUseCase, setPasswordUseCase, forgotPasswordUseCase, verifyForgotOtpUseCase, resetPasswordUseCase, refreshUseCase) {
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
        this.setPasswordUseCase = setPasswordUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.verifyForgotOtpUseCase = verifyForgotOtpUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.refreshUseCase = refreshUseCase;
    }
    async login(req, res, next) {
        try {
            const result = await this.loginUseCase.execute(req.body);
            res.cookie("accessToken", result.accessToken, { httpOnly: true, sameSite: "strict", maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE) });
            res.cookie("refreshToken", result.refreshToken, { httpOnly: true, sameSite: "strict", maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE) });
            return res.status(SUCCESS_STATUS.OK).json({ message: result.message, data: { accessToken: result.accessToken, role: result.user?.role, user: result.user } });
        }
        catch (error) {
            next(error);
        }
    }
    async setPassword(req, res, next) {
        try {
            const { token, password, confirmPassword } = req.body;
            const result = await this.setPasswordUseCase.execute(token, password, confirmPassword);
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message });
        }
        catch (error) {
            next(error);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const result = await this.forgotPasswordUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyForgotOtp(req, res, next) {
        try {
            const result = await this.verifyForgotOtpUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message });
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const result = await this.resetPasswordUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message });
        }
        catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const result = await this.refreshUseCase.execute(req.cookies.refreshToken);
            res.cookie("accessToken", result.accessToken, { httpOnly: true, sameSite: "strict", maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE) });
            return res.status(SUCCESS_STATUS.OK).json({ success: true, message: result.message, data: { accessToken: result.accessToken } });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const result = await this.logoutUseCase.execute({ refreshToken: req.cookies.refreshToken });
            res.clearCookie("refreshToken");
            return res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.ILoginUseCase)),
    __param(1, inject(AUTH_TYPES.ILogoutUseCase)),
    __param(2, inject(AUTH_TYPES.ISetPasswordUseCase)),
    __param(3, inject(AUTH_TYPES.IForgotPasswordUseCase)),
    __param(4, inject(AUTH_TYPES.IVerifyForgotOtpUseCase)),
    __param(5, inject(AUTH_TYPES.IResetPasswordUseCase)),
    __param(6, inject(AUTH_TYPES.IRefreshUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map