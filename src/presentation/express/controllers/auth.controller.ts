import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status"; 
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { IAdminRegisterUseCase } from "../../../application/usecases/auth/interface/admin.register.interface";
import { IResendAdminOtpUseCase } from "../../../application/usecases/auth/interface/resend.register.otp.interface";
import { IVerifyOtpUseCase } from "../../../application/usecases/auth/interface/verifyadmin.otp.interface";
import { SUCCESS_MESSAGE } from "../../../shared/constants/messages/success.message";
import { ILoginUseCase } from "../../../application/usecases/auth/interface/login.interface";
import { AUTH_TYPES } from "../../../infrastructure/di/types/auth/auth.types";
import { ILogoutUseCase } from "../../../application/usecases/auth/interface/logout.interface";
import { IForgotPasswordUseCase } from "../../../application/usecases/auth/interface/forgot.password.interface";
import { ForgotPasswordUseCase } from "../../../application/usecases/auth/implemetation/forgot.password.usecase";
import { VerifyForgotPasswordOtpUseCase } from "../../../application/usecases/auth/implemetation/verifyforgototp.usecase";
import { IVerifyForgotOtpUseCase } from "../../../application/usecases/auth/interface/verifyforgot.otp.interface";
import { IResetPasswordUseCase } from "../../../application/usecases/auth/interface/reset.password.interface";
import { ISetPassWordUseCase } from "../../../application/usecases/auth/interface/set.password.interface";
import { IRefreshUseCase } from "../../../application/usecases/auth/interface/refresh.interface";


@injectable()
export class AuthController {
    constructor(
        @inject(USER_TYPES.IAdminRegisterUseCase)
        private readonly _registerAdminUseCase: IAdminRegisterUseCase,
        @inject(USER_TYPES.IVerifyOtpUseCase)
        private readonly _verifyOtpUseCase: IVerifyOtpUseCase,
        @inject(USER_TYPES.IResendAdminOtpUseCase)
        private readonly _resendAdminOtpUseCase: IResendAdminOtpUseCase,
        @inject(USER_TYPES.ILoginUseCase)
        private readonly _loginUseCase :ILoginUseCase,
        @inject(AUTH_TYPES.ILogoutUseCase)
        private readonly _logoutUseCase:ILogoutUseCase,
        @inject (AUTH_TYPES.IForgotPasswordUseCase)
        private readonly _forgotpasswordUseCase:IForgotPasswordUseCase,
        @inject (AUTH_TYPES.IResetPasswordUseCase)
        private readonly _resetPasswordUseCase:IResetPasswordUseCase,
        @inject (AUTH_TYPES.IVerifyForgotOtpUseCase)
        private readonly _verifyForgotOtpUseCase:IVerifyForgotOtpUseCase,
        @inject (AUTH_TYPES.ISetPasswordUseCase)
        private readonly _setPasswordUseCase:ISetPassWordUseCase,
        @inject(AUTH_TYPES.IRefreshUseCase)
        private readonly _refreshUseCase: IRefreshUseCase
           ) { }


    async register(req: Request, res: Response,next: NextFunction) {

        try {
            const admin = await this._registerAdminUseCase.execute(req.body)

            return res.status(SUCCESS_STATUS.CREATED).json({
                message: admin.message,
                data: admin
            })

        } catch (error) {
            next(error)
        }

    }

    async verifyOtp(req:Request,res:Response,next:NextFunction){
        try{

            const verify =  await this._verifyOtpUseCase.execute(req.body)

            return res.status(SUCCESS_STATUS.OK).json({
                message:SUCCESS_MESSAGE.ADMIN_REGISTERED,
                data:{
                    user:verify.user
                }

            })
        }catch(error){
            next(error)
        }
    }

    async resendOtp(req:Request,res:Response,next:NextFunction){
        try{
            const result = await this._resendAdminOtpUseCase.execute(req.body)
            return res.status(SUCCESS_STATUS.OK).json({
                message: result.message,
                data: result
            })
        }catch(error){
            next(error)
        }
    }


    async login(req:Request,res:Response,next:NextFunction){
        try{
            const result = await this._loginUseCase.execute(req.body)

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE)
            })
                

            
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE)
            })
            return res.status(SUCCESS_STATUS.OK).json({
                message:result.message,
                data : {
                    accessToken: result.accessToken,
                    role: result.user?.role,
                    user: result.user
                }
            })
        }catch(error){
            next(error)
        }

    }

    async forgotPassword(req:Request,res:Response,next:NextFunction){
        try{

             const result =await this._forgotpasswordUseCase.execute(req.body)
            return res.status(SUCCESS_STATUS.OK).json({
                success:true,
                message:result.message
            })

        }catch(error){
            next(error)
        }
    }

    async verifyForgotOtp(req: Request,res: Response,next: NextFunction) {
    try {

        const result = await this._verifyForgotOtpUseCase.execute(req.body);

        res.status(SUCCESS_STATUS.OK).json(result);

    } catch (error) {
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

    async resetPassword(req:Request,res:Response,next:NextFunction){
        try{

             const result =await this._resetPasswordUseCase.execute(req.body)
            return res.status(SUCCESS_STATUS.OK).json({
                success:true,
                message:result.message  
            })
        }catch(error){
            next(error)
        }
    }

    async setPassword(req:Request,res:Response,next:NextFunction){
        try{
            const { token, password, confirmPassword } = req.body
            const result = await this._setPasswordUseCase.execute(token,password,confirmPassword)

            return res.status(SUCCESS_STATUS.OK).json({
                success:true,
                message:result.message
            })
        }catch(error){
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const result = await this._refreshUseCase.execute(refreshToken);

            res.cookie("accessToken", result.accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE)
            });

            return res.status(SUCCESS_STATUS.OK).json({
                success: true,
                message: result.message,
                data: {
                    accessToken: result.accessToken
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req:Request,res:Response,next:NextFunction){
        try{
            const refreshToken= req.cookies.refreshToken;
            const result = await this._logoutUseCase.execute({ refreshToken });
            res.clearCookie("refreshToken");
            return res.json(result);
        }catch(error){
            next(error);
        }
    }
}
