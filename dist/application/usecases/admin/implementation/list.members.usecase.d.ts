import { IListMembersUseCase } from "../interface/list.members.interface";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { UserStatus } from "../../../../domain/enum/user/status.enum";
export declare class ListMembersUseCase implements IListMembersUseCase {
    private readonly _userRepository;
    constructor(_userRepository: IUserRepository);
    execute(): Promise<{
        data: Array<{
            name: string;
            email: string;
            role: string;
            status: UserStatus;
        }>;
    }>;
}
