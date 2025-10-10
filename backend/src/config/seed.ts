import { PrismaClient } from "@prisma/client";
import { env } from "./env";
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
    const hashedPassword = await Bun.password.hash(env.DEV_PASSWORD, {
      algorithm: "bcrypt",
      cost: 10,
    });

    await prisma.user.create({
      data: {
        name: env.DEV_NAME,
        email: env.DEV_EMAIL,
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
