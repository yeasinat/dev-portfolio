import {
  DISABLE_ADMIN_SIGNUP,
  DEV_EMAIL,
  DEV_PASSWORD,
  DEV_NAME,
} from "../config/env";
import { prisma } from "./prisma";

async function createAdmin() {
  if (DISABLE_ADMIN_SIGNUP === "true") return;

  // TODO before going to production delete this line
  await prisma.user.deleteMany();

  // TODO need correction in this logic the role does not exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const name = DEV_NAME as string;
  const email = DEV_EMAIL as string;
  const password = DEV_PASSWORD as string;
  const hashedPassword = await Bun.password.hash(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user created.");
}

createAdmin()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
