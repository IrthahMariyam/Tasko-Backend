import { ContainerModule } from "inversify";
import { ADMIN_TYPES } from "../types/admin/admin.types";
import { IInviteMemberUseCase } from "../../../application/usecases/admin/interface/invite.member.interface";
import { InviteMemberUseCase } from "../../../application/usecases/admin/implementation/invite.member.usecase";
import { IVerifyInvitationUseCase } from "../../../application/usecases/admin/interface/verify.member.interface";
import { VerifyInvitationUseCase } from "../../../application/usecases/admin/implementation/verify.member.usecase";
import { IListMembersUseCase } from "../../../application/usecases/admin/interface/list.members.interface";
import { ListMembersUseCase } from "../../../application/usecases/admin/implementation/list.members.usecase";
import { AdminController } from "../../../presentation/express/controllers/admin.controllers";


export const AdminModule = new ContainerModule(({bind})=>{
bind<IInviteMemberUseCase>(ADMIN_TYPES.IInviteMemberUseCase).to(InviteMemberUseCase)
bind<IVerifyInvitationUseCase>(ADMIN_TYPES.IVerifyInvitationUseCase).to(VerifyInvitationUseCase)
bind<IListMembersUseCase>(ADMIN_TYPES.IListMembersUseCase).to(ListMembersUseCase)
bind<AdminController>(ADMIN_TYPES.AdminController).to(AdminController)

});
