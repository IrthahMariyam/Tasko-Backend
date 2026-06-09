import { ILogoutUseCase } from '../interface/logout.interface';
import { LogoutDTO } from '../../../dtos/auth/logout.register.dto';
export declare class LogoutUseCase implements ILogoutUseCase {
    constructor();
    execute(dto: LogoutDTO): Promise<void>;
}
