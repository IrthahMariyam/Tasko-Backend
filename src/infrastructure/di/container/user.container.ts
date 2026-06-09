import { ContainerModule } from "inversify";
import { UserRepository } from "../../db/repository/implements/user.repository";
import { USER_TYPES } from  "../types/user/user.types"
import { Model } from "mongoose";
import { UserModel } from "../../db/models/user.model";
import { UserPersistenceMapper } from "../../mappers/user.mapper";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { IUser } from "../../db/interface/user.interface";
import { RegisterAdminUseCase } from "../../../application/usecases/auth/implemetation/adminregister.usecase";
import { ResendAdminOtpUseCase } from "../../../application/usecases/auth/implemetation/resendadminotp.usecase";
import { VerifyOtpUseCase } from "../../../application/usecases/auth/implemetation/verifyadmin.usecase";
import { IAdminRegisterUseCase } from "../../../application/usecases/auth/interface/admin.register.interface";
import { IResendAdminOtpUseCase } from "../../../application/usecases/auth/interface/resend.register.otp.interface";
import { IVerifyOtpUseCase } from "../../../application/usecases/auth/interface/verifyadmin.otp.interface";
import { AuthController } from "../../../presentation/express/controllers/auth.controller";
import { ILoginUseCase } from "../../../application/usecases/auth/interface/login.interface";
import { LoginUseCase } from "../../../application/usecases/auth/implemetation/login.usecase";
import { LogoutUseCase } from "../../../application/usecases/auth/implemetation/logout.usecase";
import { ILogoutUseCase } from "../../../application/usecases/auth/interface/logout.interface";
import { AUTH_TYPES } from "../types/auth/auth.types";
import { IForgotPasswordUseCase } from "../../../application/usecases/auth/interface/forgot.password.interface";
import { ForgotPasswordUseCase } from "../../../application/usecases/auth/implemetation/forgot.password.usecase";
import { IResetPasswordUseCase } from "../../../application/usecases/auth/interface/reset.password.interface";
import { ResetPasswordUseCase } from "../../../application/usecases/auth/implemetation/reset.password.usecase";
import { IVerifyForgotOtpUseCase } from "../../../application/usecases/auth/interface/verifyforgot.otp.interface";
import { VerifyForgotPasswordOtpUseCase } from "../../../application/usecases/auth/implemetation/verifyforgototp.usecase";
import { ISetPassWordUseCase } from "../../../application/usecases/auth/interface/set.password.interface";
import { SetPasswordUseCase } from "../../../application/usecases/auth/implemetation/set.password.usecase";
import { IRefreshUseCase } from "../../../application/usecases/auth/interface/refresh.interface";
import { RefreshUseCase } from "../../../application/usecases/auth/implemetation/refresh.usecase";



export const UserModule = new ContainerModule(({bind})=>{
    bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository)
    bind<UserPersistenceMapper>(USER_TYPES.UserPersistenceMapper).to(UserPersistenceMapper)
    bind<Model<IUser>>(USER_TYPES.userModel).toConstantValue(UserModel)
    bind<IAdminRegisterUseCase>(USER_TYPES.IAdminRegisterUseCase).to(RegisterAdminUseCase)
    bind<IVerifyOtpUseCase>(USER_TYPES.IVerifyOtpUseCase).to(VerifyOtpUseCase)
    bind<IResendAdminOtpUseCase>(USER_TYPES.IResendAdminOtpUseCase).to(ResendAdminOtpUseCase)
    bind<AuthController>(USER_TYPES.AuthController).to(AuthController)
    bind<ILoginUseCase>(USER_TYPES.ILoginUseCase).to(LoginUseCase)
    bind<ILogoutUseCase>(AUTH_TYPES.ILogoutUseCase).to(LogoutUseCase)
    bind<IForgotPasswordUseCase>(AUTH_TYPES.IForgotPasswordUseCase).to(ForgotPasswordUseCase)
    bind<IResetPasswordUseCase>(AUTH_TYPES.IResetPasswordUseCase).to(ResetPasswordUseCase)
    bind<IVerifyForgotOtpUseCase>(AUTH_TYPES.IVerifyForgotOtpUseCase).to(VerifyForgotPasswordOtpUseCase)
    bind<ISetPassWordUseCase>(AUTH_TYPES.ISetPasswordUseCase).to(SetPasswordUseCase)
    bind<IRefreshUseCase>(AUTH_TYPES.IRefreshUseCase).to(RefreshUseCase)
});
