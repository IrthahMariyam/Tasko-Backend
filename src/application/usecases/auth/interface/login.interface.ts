import { LoginDTO } from "../../../dtos/auth/login.dto";
import { AuthResult } from "../../../../domain/types/auth.result.types";

export interface ILoginUseCase {
  execute(dto: LoginDTO): Promise<AuthResult>;
}
