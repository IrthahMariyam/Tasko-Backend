import { RefreshResult } from "../../../../domain/types/refresh.types";
export interface IRefreshUseCase {
  execute(refreshToken: string): Promise<RefreshResult>;
}
