var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from "class-validator";
import { Exclude, Expose } from "class-transformer";
let LoginDTO = class LoginDTO {
    email;
    password;
};
__decorate([
    Expose(),
    IsEmail({}, { message: "Invalid email format" }),
    IsNotEmpty({ message: "Email is required" }),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    Expose(),
    IsString({ message: "Password must be a string" }),
    IsNotEmpty({ message: "Password is required" }),
    MinLength(8, { message: "Password must be at least 8 characters long" }),
    MaxLength(20, { message: "Password cannot exceed 20 characters" }),
    Matches(/^(?=.*[A-Z])(?=.*\d)/, {
        message: "Password must contain 1 uppercase letter and 1 number",
    }),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
LoginDTO = __decorate([
    Exclude()
], LoginDTO);
export { LoginDTO };
//# sourceMappingURL=login.dto.js.map