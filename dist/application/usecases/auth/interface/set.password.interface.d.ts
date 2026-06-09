export interface ISetPassWordUseCase {
    execute(token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
}
