var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "inversify";
import { USER_TYPES } from "../../../../infrastructure/di/types/user/user.types";
let ListMembersUseCase = class ListMembersUseCase {
    _userRepository;
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute() {
        const users = await this._userRepository.findAll();
        const data = users.map(user => ({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }));
        return { data };
    }
};
ListMembersUseCase = __decorate([
    injectable(),
    __param(0, inject(USER_TYPES.IUserRepository)),
    __metadata("design:paramtypes", [Object])
], ListMembersUseCase);
export { ListMembersUseCase };
//# sourceMappingURL=list.members.usecase.js.map