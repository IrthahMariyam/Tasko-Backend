import { ADMIN_TYPES } from "../../../infrastructure/di/types/admin/admin.types";
import { AdminController } from "../controllers/admin.controllers";
import { container } from "../../../infrastructure/di/container/container";
import { validateDto } from "../middlewares/validate-dto.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Router } from "express";
import { InviteMemberDTO } from "../../../application/dtos/admin/invite.member.dto";
import { DesignationModel } from "../../../infrastructure/db/models/designation.model";
import { UserModel } from "../../../infrastructure/db/models/user.model";

const router = Router();
const adminController = container.get<AdminController>(ADMIN_TYPES.AdminController);

function normalizeDesignation(value: unknown) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toUpperCase();
}

function designationNameFilter(name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return { $regex: `^${escapedName}$`, $options: "i" };
}

async function designationExists(name: string, excludeId?: string) {
  const filter: Record<string, unknown> = { name: designationNameFilter(name) };
  if (excludeId) filter._id = { $ne: excludeId };
  return Boolean(await DesignationModel.exists(filter));
}

router.post("/verify-members", (req, res, next) => adminController.verifyInvitation(req, res, next));
router.post("/members/invite", authMiddleware, validateDto(InviteMemberDTO), (req, res, next) => adminController.inviteMember(req, res, next));
router.get("/members", authMiddleware, (req, res, next) => adminController.listUsers(req, res, next));
router.get("/designations", authMiddleware, async (req, res, next) => { try { if (req.user?.role !== "ADMIN" && req.user?.role !== "SUPER_ADMIN") return res.status(403).json({ success: false }); const data = await DesignationModel.find().sort({ name: 1 }).lean(); return res.json({ success: true, data: data.map((designation) => ({ id: designation._id.toString(), name: designation.name })) }); } catch (error) { next(error); } });
router.post("/designations", authMiddleware, async (req, res, next) => { try { if (req.user?.role !== "SUPER_ADMIN") return res.status(403).json({ success: false, message: "Only super admins can manage designations." }); const name = normalizeDesignation(req.body.name); if (!name) return res.status(400).json({ success: false, message: "Designation name is required." }); if (await designationExists(name)) return res.status(409).json({ success: false, message: "That designation already exists." }); const data = await DesignationModel.create({ name }); return res.status(201).json({ success: true, data: { id: data._id.toString(), name: data.name } }); } catch (error) { next(error); } });
router.patch("/designations/:id", authMiddleware, async (req, res, next) => { try { if (req.user?.role !== "SUPER_ADMIN") return res.status(403).json({ success: false, message: "Only super admins can manage designations." }); const id = String(req.params.id); const name = normalizeDesignation(req.body.name); if (!name) return res.status(400).json({ success: false, message: "Designation name is required." }); const designation = await DesignationModel.findById(id); if (!designation) return res.status(404).json({ success: false, message: "Designation not found." }); if (await designationExists(name, id)) return res.status(409).json({ success: false, message: "That designation already exists." }); const previousName = designation.name; designation.name = name; await designation.save(); await UserModel.updateMany({ designation: designationNameFilter(previousName) }, { $set: { designation: name } }); return res.json({ success: true, data: { id: designation._id.toString(), name: designation.name } }); } catch (error) { next(error); } });
router.delete("/designations/:id", authMiddleware, async (req, res, next) => { try { if (req.user?.role !== "SUPER_ADMIN") return res.status(403).json({ success: false, message: "Only super admins can manage designations." }); const designation = await DesignationModel.findById(String(req.params.id)); if (!designation) return res.status(404).json({ success: false, message: "Designation not found." }); const assignedUsers = await UserModel.countDocuments({ designation: designationNameFilter(designation.name) }); if (assignedUsers > 0) return res.status(409).json({ success: false, message: "This designation is assigned to users and cannot be deleted." }); await designation.deleteOne(); return res.json({ success: true }); } catch (error) { next(error); } });
router.patch("/members/:id/block", authMiddleware, (req, res, next) => adminController.blockMember(req, res, next));
router.patch("/members/:id/unblock", authMiddleware, (req, res, next) => adminController.unblockMember(req, res, next));
router.patch("/members/:id/designation", authMiddleware, (req, res, next) => adminController.updateMemberDesignation(req, res, next));
export { router as adminRouter };