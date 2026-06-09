import { UserRole } from "../enum/user/role.enum";
import { UserStatus } from "../enum/user/status.enum";
export type AuthResult = {
    message:string;
    user?:{
        id?:string;
        name:string;
        email:string;
        role:UserRole;
        status:UserStatus;
    }
    accessToken?:string;
    refreshToken?:string;
}