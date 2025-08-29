import {
  DISABLE_ADMIN_SIGNUP,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_NAME,
} from "../config/env";
import { prisma } from "./prisma";

async function createAdmin() {
  if (DISABLE_ADMIN_SIGNUP === "true") return;

  // TODO before going to production delete this line
  await prisma.user.deleteMany();

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const name = ADMIN_NAME as string;
  const email = ADMIN_EMAIL as string;
  const password = ADMIN_PASSWORD as string;
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
