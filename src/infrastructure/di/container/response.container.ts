import { ContainerModule } from "inversify";
import { RESPONSE_TYPES } from "../types/response/response.types";
import { AuthResponseMapper } from "../../mappers/auth.response.mapper";
import { AdminResponseMapper } from "../../mappers/admin.response.mapper";

export const ResponseModule = new ContainerModule(({ bind }) => {
  bind<AuthResponseMapper>(RESPONSE_TYPES.AuthResponseMapper).to(
    AuthResponseMapper,
  );
  bind<AdminResponseMapper>(RESPONSE_TYPES.AdminResponseMapper).to(
    AdminResponseMapper,
  );
});
