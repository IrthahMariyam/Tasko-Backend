import { UserRole } from "../enum/user/role.enum";
import { UserStatus } from "../enum/user/status.enum";
export type AuthResult = {
  message: string;
  user?: {
    id?: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    designation?: string;
    joiningDate?: Date | string;
    profileImage?: string;
  };
  accessToken?: string;
  refreshToken?: string;
};
