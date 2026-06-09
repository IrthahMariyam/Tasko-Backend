import { RefreshResult } from "../../../../domain/types/refresh.types.js";
export interface IRefreshUseCase {
    execute(refreshToken: string): Promise<RefreshResult>;
}
