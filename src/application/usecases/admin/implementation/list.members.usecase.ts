import { inject, injectable } from "inversify";
import { IListMembersUseCase } from "../interface/list.members.interface";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
import { IUserRepository } from "../../../../domain/interfaces/IUserRepository";
import { UserStatus } from "../../../../domain/enum/user/status.enum";

@injectable()
export class ListMembersUseCase implements IListMembersUseCase {
    constructor(
        @inject(USER_TYPES.IUserRepository)
        private readonly _userRepository: IUserRepository
    ) {}

    async execute(): Promise<{ data: Array<{ name: string; email: string; role: string; status: UserStatus; }> }> {
        const users = await this._userRepository.findAll();
        const data = users.map(user => ({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }));
        return { data };
    }
}
