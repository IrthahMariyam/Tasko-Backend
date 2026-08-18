import { AdminRegisterDTO } from "../../../dtos/auth/admin.register.dto";
export interface IAdminRegisterUseCase {
  execute(dto: AdminRegisterDTO): Promise<{ message: string }>;
}
