import { AdminController } from "../../../../presentation/express/controllers/admin.controllers";

export const ADMIN_TYPES = {
    IInviteMemberUseCase: Symbol.for('IInviteMemberUseCase'),
    IVerifyInvitationUseCase:Symbol.for('IVerifyInvitationUseCase'),
    IListMembersUseCase: Symbol.for('IListMembersUseCase'),
    authMiddleware : Symbol.for('authMiddleware'),
    AdminController:Symbol.for('AdminController')
}