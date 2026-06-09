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
import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { SUCCESS_MESSAGE } from "../../../shared/constants/messages/success.message";
import { AUTH_TYPES } from "../../../infrastructure/di/types/auth/auth.types";
let AuthController = class AuthController {
    _registerAdminUseCase;
    _verifyOtpUseCase;
    _resendAdminOtpUseCase;
    _loginUseCase;
    _logoutUseCase;
    _forgotpasswordUseCase;
    _resetPasswordUseCase;
    _verifyForgotOtpUseCase;
    _setPasswordUseCase;
    constructor(_registerAdminUseCase, _verifyOtpUseCase, _resendAdminOtpUseCase, _loginUseCase, _logoutUseCase, _forgotpasswordUseCase, _resetPasswordUseCase, _verifyForgotOtpUseCase, _setPasswordUseCase) {
        this._registerAdminUseCase = _registerAdminUseCase;
        this._verifyOtpUseCase = _verifyOtpUseCase;
        this._resendAdminOtpUseCase = _resendAdminOtpUseCase;
        this._loginUseCase = _loginUseCase;
        this._logoutUseCase = _logoutUseCase;
        this._forgotpasswordUseCase = _forgotpasswordUseCase;
        this._resetPasswordUseCase = _resetPasswordUseCase;
        this._verifyForgotOtpUseCase = _verifyForgotOtpUseCase;
        this._setPasswordUseCase = _setPasswordUseCase;
    }
    async register(req, res, next) {
        try {
            const admin = await this._registerAdminUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.CREATED).json({
                message: admin.message,
                data: admin
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyOtp(req, res, next) {
        try {
            const verify = await this._verifyOtpUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({
                message: SUCCESS_MESSAGE.ADMIN_REGISTERED,
                data: {
                    user: verify.user
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async resendOtp(req, res, next) {
        try {
            const result = await this._resendAdminOtpUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({
                message: result.message,
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const result = await this._loginUseCase.execute(req.body);
            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE)
            });
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE)
            });
            return res.status(SUCCESS_STATUS.OK).json({
                message: result.message,
                data: {
                    accessToken: result.accessToken,
                    role: result.user?.role,
                    user: result.user
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const result = await this._forgotpasswordUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                message: result.message
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyForgotOtp(req, res, next) {
        try {
            const result = await this._verifyForgotOtpUseCase.execute(req.body);
            res.status(SUCCESS_STATUS.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    // async changePassword(req:Request,res:Response,next:NextFunction){
    //     try{
    //        
    //     }catch(error){
    //         next(error)
    //     }
    // }
    async resetPassword(req, res, next) {
        try {
            const result = await this._resetPasswordUseCase.execute(req.body);
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                message: result.message
            });
        }
        catch (error) {
            next(error);
        }
    }
    async setPassword(req, res, next) {
        try {
            const { token, password, confirmPassword } = req.body;
            const result = await this._setPasswordUseCase.execute(token, password, confirmPassword);
            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                message: result.message
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const result = await this._logoutUseCase.execute(refreshToken);
            res.clearCookie(refreshToken);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IAdminRegisterUseCase)),
    __param(1, inject(USER_TYPES.IVerifyOtpUseCase)),
    __param(2, inject(USER_TYPES.IResendAdminOtpUseCase)),
    __param(3, inject(USER_TYPES.ILoginUseCase)),
    __param(4, inject(AUTH_TYPES.ILogoutUseCase)),
    __param(5, inject(AUTH_TYPES.IForgotPasswordUseCase)),
    __param(6, inject(AUTH_TYPES.IResetPasswordUseCase)),
    __param(7, inject(AUTH_TYPES.IVerifyForgotOtpUseCase)),
    __param(8, inject(AUTH_TYPES.ISetPasswordUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map