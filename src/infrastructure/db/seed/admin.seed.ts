import { User } from "../../../domain/entities/User";
import { UserRole } from "../../../domain/enum/user/role.enum";
import { UserStatus } from "../../../domain/enum/user/status.enum";
import { UserModel } from "../models/user.model";
import { hashPassword } from "../../../shared/utils/password.hash.util";
import { logger } from "../../../shared/logger/logger";

const requiredSettings = [
  "ADMIN_NAME",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
] as const;

export const seedAdmin = async (): Promise<void> => {
  const name = process.env.ADMIN_NAME!.trim();
  const email = process.env.ADMIN_EMAIL!.trim().toLowerCase();
  const existingAdmin = await UserModel.findOne({ email }).lean();

  if (existingAdmin) {
    logger.info(`Admin seed skipped; user already exists for ${email}`);
    return;
  }

  const admin = User.create({
    name,
    email,
    password: await hashPassword(process.env.ADMIN_PASSWORD!),
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    isVerified: true,
  });

  await UserModel.create({
    name: admin.name,
    email: admin.email,
    password: admin.password,
    role: admin.role,
    status: admin.status,
    isVerified: admin.isVerified,
  });

  logger.info(`Initial admin account seeded for ${email}`);
};
