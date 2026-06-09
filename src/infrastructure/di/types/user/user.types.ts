

export const USER_TYPES={
    IUserRepository : Symbol.for('IUserRepository'),
    userModel : Symbol.for('userModel'),
    UserPersistenceMapper : Symbol.for('UserPersistenceMapper'),
    IAdminRegisterUseCase: Symbol.for('IAdminRegisterUseCase'),//auth
    IVerifyOtpUseCase: Symbol.for('IVerifyOtpUseCase'),//auth
    IResendAdminOtpUseCase: Symbol.for('IResendAdminOtpUseCase'),//auth
    AuthController: Symbol.for('AuthController'),//auth
    ILoginUseCase:Symbol.for('ILoginUseCase')
}
