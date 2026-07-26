import { NextFunction, Request, Response } from "express";
import { ILoginUseCase } from "../../../application/usecases/auth/interface/login.interface";
import { ILogoutUseCase } from "../../../application/usecases/auth/interface/logout.interface";
import { ISetPassWordUseCase } from "../../../application/usecases/auth/interface/set.password.interface";
import { IRefreshUseCase } from "../../../application/usecases/auth/interface/refresh.interface";
import { IForgotPasswordUseCase } from "../../../application/usecases/auth/interface/forgot.password.interface";
import { IVerifyForgotOtpUseCase } from "../../../application/usecases/auth/interface/verifyforgot.otp.interface";
import { IResetPasswordUseCase } from "../../../application/usecases/auth/interface/reset.password.interface";
export declare class AuthController {
    private readonly loginUseCase;
    private readonly logoutUseCase;
    private readonly setPasswordUseCase;
    private readonly forgotPasswordUseCase;
    private readonly verifyForgotOtpUseCase;
    private readonly resetPasswordUseCase;
    private readonly refreshUseCase;
    constructor(loginUseCase: ILoginUseCase, logoutUseCase: ILogoutUseCase, setPasswordUseCase: ISetPassWordUseCase, forgotPasswordUseCase: IForgotPasswordUseCase, verifyForgotOtpUseCase: IVerifyForgotOtpUseCase, resetPasswordUseCase: IResetPasswordUseCase, refreshUseCase: IRefreshUseCase);
    login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    setPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    verifyForgotOtp(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    refresh(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    logout(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
