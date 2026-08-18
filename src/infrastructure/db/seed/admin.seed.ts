import { User } from "../../../domain/entities/User";
import { UserRole } from "../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../domain/enum/user/status.enum";
import { UserModel } from "../models/user.model";
import { hashPassword } from "../../../shared/utils/password.hash.util";
import { logger } from "../../../shared/logger/logger";

const requiredSettings = [
  "SUPER_ADMIN_NAME",
  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASSWORD",
] as const;

export const seedAdmin = async (): Promise<void> => {
  const name = (process.env.SUPER_ADMIN_NAME ?? process.env.ADMIN_NAME ?? "Tasko Super Admin").trim();
  const email = (process.env.SUPER_ADMIN_EMAIL ?? process.env.ADMIN_EMAIL ?? "superadmin@tasko.local").trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD;

  if (!password) {
    logger.warn("Super admin seed skipped because no SUPER_ADMIN_PASSWORD or ADMIN_PASSWORD was defined.");
    return;
  }

  const existingAdmin = await UserModel.findOne({ email }).lean();

  if (existingAdmin) {
    logger.info(`Super admin seed skipped; user already exists for ${email}`);
    return;
  }

  const admin = User.create({
    name,
    email,
    password: await hashPassword(password),
    role: UserRole.SUPER_ADMIN,
    status: UserStatus.ACTIVE,
    designation: "Super Admin",
    joiningDate: new Date(),
    isVerified: true,
  });

  await UserModel.create({
    name: admin.name,
    email: admin.email,
    password: admin.password,
    role: admin.role,
    designation: admin.designation,
    joiningDate: admin.joiningDate,
    status: admin.status,
    isVerified: admin.isVerified,
  });

  logger.info(`Initial super admin account seeded for ${email}`);
};
