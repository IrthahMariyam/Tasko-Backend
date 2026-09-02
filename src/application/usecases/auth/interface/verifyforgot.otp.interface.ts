export interface IVerifyOtpUseCase {
  execute(dto: { email: string; otp: string }): Promise<{ message: string }>;
}
