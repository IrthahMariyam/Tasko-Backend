export interface IResetPasswordUseCase {
  execute(dto: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ message: string }>;
}
