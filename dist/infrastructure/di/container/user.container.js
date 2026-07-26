import { ContainerModule } from "inversify";
import { SetPasswordUseCase } from "../../../application/usecases/auth/implemetation/set.password.usecase";
import { LoginUseCase } from "../../../application/usecases/auth/implemetation/login.usecase";
import { LogoutUseCase } from "../../../application/usecases/auth/implemetation/logout.usecase";
import { RefreshUseCase } from "../../../application/usecases/auth/implemetation/refresh.usecase";
import { ForgotPasswordUseCase } from "../../../application/usecases/auth/implemetation/forgot.password.usecase";
import { VerifyForgotPasswordOtpUseCase } from "../../../application/usecases/auth/implemetation/verifyforgototp.usecase";
import { ResetPasswordUseCase } from "../../../application/usecases/auth/implemetation/reset.password.usecase";
import { AuthController } from "../../../presentation/express/controllers/auth.controller";
import { UserModel } from "../../db/models/user.model";
import { UserRepository } from "../../db/repository/implements/user.repository";
import { UserPersistenceMapper } from "../../mappers/user.mapper";
import { AUTH_TYPES } from "../types/auth/auth.types";
import { USER_TYPES } from "../types/user/user.types";
export const UserModule = new ContainerModule(({ bind }) => {
    bind(USER_TYPES.IUserRepository).to(UserRepository);
    bind(USER_TYPES.UserPersistenceMapper).to(UserPersistenceMapper);
    bind(USER_TYPES.userModel).toConstantValue(UserModel);
    bind(USER_TYPES.AuthController).to(AuthController);
    bind(USER_TYPES.ILoginUseCase).to(LoginUseCase);
    bind(AUTH_TYPES.ILogoutUseCase).to(LogoutUseCase);
    bind(AUTH_TYPES.ISetPasswordUseCase).to(SetPasswordUseCase);
    bind(AUTH_TYPES.IForgotPasswordUseCase).to(ForgotPasswordUseCase);
    bind(AUTH_TYPES.IVerifyForgotOtpUseCase).to(VerifyForgotPasswordOtpUseCase);
    bind(AUTH_TYPES.IResetPasswordUseCase).to(ResetPasswordUseCase);
    bind(AUTH_TYPES.IRefreshUseCase).to(RefreshUseCase);
});
//# sourceMappingURL=user.container.js.map