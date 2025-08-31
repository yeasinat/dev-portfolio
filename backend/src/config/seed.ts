import { PrismaClient } from "@prisma/client";
import { DEV_EMAIL, DEV_NAME, DEV_PASSWORD } from "./env";
const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findFirst({
    include: {
      projects: true,
      experiences: true,
      technologies: true,
    },
  });

  if (!existingUser) {
    const hashedPassword = await Bun.password.hash(DEV_PASSWORD as string, {
      algorithm: "bcrypt",
      cost: 10,
    });

    await prisma.user.create({
      data: {
        name: DEV_NAME as string,
        email: DEV_EMAIL as string,
        password: hashedPassword,
      },
    });
    console.log("✅ Portfolio user seeded from .env");
  } else {
    console.log("ℹ️ User already exists, skipping seed");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
