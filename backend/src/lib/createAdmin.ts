import { env } from "../config/env";
import { prisma } from "./prisma";

async function createAdmin() {
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

  const name = env.DEV_NAME;
  const email = env.DEV_EMAIL;
  const password = env.DEV_PASSWORD;
  const hashedPassword = await Bun.password.hash(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created.");
}

createAdmin()
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
