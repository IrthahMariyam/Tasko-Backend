import { LoginDTO } from "../../../dtos/auth/login.dto.js";
import { AuthResult } from "../../../../domain/types/auth.result.types.js";

export interface ILoginUseCase{
    execute(dto:LoginDTO):Promise<AuthResult>
}