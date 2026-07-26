export interface IVerifyForgotOtpUseCase {
    execute(dto: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
    }>;
}
