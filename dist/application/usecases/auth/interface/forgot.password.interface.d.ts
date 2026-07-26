export interface IForgotPasswordUseCase {
    execute(dto: {
        email: string;
    }): Promise<{
        message: string;
    }>;
}
