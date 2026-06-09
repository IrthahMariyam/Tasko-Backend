import { ContainerModule } from "inversify";
import { ADMIN_TYPES } from "../types/admin/admin.types";
import { InviteMemberUseCase } from "../../../application/usecases/admin/implementation/invite.member.usecase";
import { VerifyInvitationUseCase } from "../../../application/usecases/admin/implementation/verify.member.usecase";
import { ListMembersUseCase } from "../../../application/usecases/admin/implementation/list.members.usecase";
import { AdminController } from "../../../presentation/express/controllers/admin.controllers";
export const AdminModule = new ContainerModule(({ bind }) => {
    bind(ADMIN_TYPES.IInviteMemberUseCase).to(InviteMemberUseCase);
    bind(ADMIN_TYPES.IVerifyInvitationUseCase).to(VerifyInvitationUseCase);
    bind(ADMIN_TYPES.IListMembersUseCase).to(ListMembersUseCase);
    bind(ADMIN_TYPES.AdminController).to(AdminController);
});
//# sourceMappingURL=admin.container.js.map