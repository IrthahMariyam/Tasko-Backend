import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILoginUseCase } from "../../../application/usecases/auth/interface/login.interface";
import { ILogoutUseCase } from "../../../application/usecases/auth/interface/logout.interface";
import { ISetPassWordUseCase } from "../../../application/usecases/auth/interface/set.password.interface";
import { IRefreshUseCase } from "../../../application/usecases/auth/interface/refresh.interface";
import { IForgotPasswordUseCase } from "../../../application/usecases/auth/interface/forgot.password.interface";
import { IVerifyForgotOtpUseCase } from "../../../application/usecases/auth/interface/verifyforgot.otp.interface";
import { IResetPasswordUseCase } from "../../../application/usecases/auth/interface/reset.password.interface";
import { AUTH_TYPES } from "../../../infrastructure/di/types/auth/auth.types";
import { USER_TYPES } from "../../../infrastructure/di/types/user/user.types";
import { SUCCESS_STATUS } from "../../../shared/constants/status-code/success.status";
import { CLIENT_ERROR_STATUS } from "../../../shared/constants/status-code/client-error.status";
import { ERROR_MESSAGE } from "../../../shared/constants/messages/error.message";

@injectable()
export class AuthController {
  constructor(
    @inject(USER_TYPES.ILoginUseCase)
    private readonly loginUseCase: ILoginUseCase,
    @inject(AUTH_TYPES.ILogoutUseCase)
    private readonly logoutUseCase: ILogoutUseCase,
    @inject(AUTH_TYPES.ISetPasswordUseCase)
    private readonly setPasswordUseCase: ISetPassWordUseCase,
    @inject(AUTH_TYPES.IForgotPasswordUseCase)
    private readonly forgotPasswordUseCase: IForgotPasswordUseCase,
    @inject(AUTH_TYPES.IVerifyForgotOtpUseCase)
    private readonly verifyForgotOtpUseCase: IVerifyForgotOtpUseCase,
    @inject(AUTH_TYPES.IResetPasswordUseCase)
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
    @inject(AUTH_TYPES.IRefreshUseCase)
    private readonly refreshUseCase: IRefreshUseCase,
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
      });
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
      });
      return res
        .status(SUCCESS_STATUS.OK)
        .json({
          message: result.message,
          data: {
            accessToken: result.accessToken,
            role: result.user?.role,
            user: result.user,
          },
        });
    } catch (error) {
      next(error);
    }
  }

  async setPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password, confirmPassword } = req.body;
      const result = await this.setPasswordUseCase.execute(
        token,
        password,
        confirmPassword,
      );
      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.forgotPasswordUseCase.execute(req.body);
      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async verifyForgotOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.verifyForgotOtpUseCase.execute(req.body);
      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.resetPasswordUseCase.execute(req.body);
      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.refreshUseCase.execute(
        req.cookies.refreshToken,
      );
      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
      });
      return res
        .status(SUCCESS_STATUS.OK)
        .json({
          success: true,
          message: result.message,
          data: { accessToken: result.accessToken },
        });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res
          .status(CLIENT_ERROR_STATUS.UNAUTHORIZED)
          .json({ success: false, message: ERROR_MESSAGE.UNAUTHORIZED });
      }

      return res
        .status(SUCCESS_STATUS.OK)
        .json({ success: true, data: { user: req.user } });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.logoutUseCase.execute({
        refreshToken: req.cookies.refreshToken,
      });
      res.clearCookie("refreshToken");
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
