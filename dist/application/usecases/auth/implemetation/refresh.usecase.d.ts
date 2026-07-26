import { IRefreshUseCase } from "../interface/refresh.interface";
import { RefreshResult } from "../../../../domain/types/refresh.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
export declare class RefreshUseCase implements IRefreshUseCase {
    private readonly _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(refreshToken: string): Promise<RefreshResult>;
}
