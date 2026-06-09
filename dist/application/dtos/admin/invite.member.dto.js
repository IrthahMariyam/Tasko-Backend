var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { UserRole } from "../../../domain/enum/user/role.enum";
let InviteMemberDTO = class InviteMemberDTO {
    name;
    email;
    role;
};
__decorate([
    Expose(),
    IsString({ message: "Name must be a string" }),
    IsNotEmpty({ message: "Name is required" }),
    __metadata("design:type", String)
], InviteMemberDTO.prototype, "name", void 0);
__decorate([
    Expose(),
    IsEmail({}, { message: "Invalid email format" }),
    IsNotEmpty({ message: "Email is required" }),
    __metadata("design:type", String)
], InviteMemberDTO.prototype, "email", void 0);
__decorate([
    Expose(),
    IsEnum(UserRole, { message: "Role must be ADMIN or USER" }),
    IsNotEmpty({ message: "Role is required" }),
    __metadata("design:type", String)
], InviteMemberDTO.prototype, "role", void 0);
InviteMemberDTO = __decorate([
    Exclude()
], InviteMemberDTO);
export { InviteMemberDTO };
//# sourceMappingURL=invite.member.dto.js.map