import type { Request, Response } from "express";

import { prisma } from "../lib/prisma";
import { catchAsync } from "../lib/catchAsync";
import cloudinary from "../config/cloudinary";

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    include: {
      projects: true,
      technologies: true,
      experiences: true,
    },
  });
  const { password, ...userWithoutPassword } = user[0];
  return res.status(200).json(userWithoutPassword);
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      projects: true,
      technologies: true,
      experiences: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { password, ...userWithoutPassword } = user;
  return res.status(200).json(userWithoutPassword);
});

export const updateUserById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, bio, socialLinks } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData: any = { name, email, bio, socialLinks };

    if (req.file) {
      if (user.imagePublicId) {
        await cloudinary.uploader.destroy(user.imagePublicId);
      }
      updatedData.imageUrl = req.file?.path;
      updatedData.imagePublicId = req.file?.filename;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return res.status(200).json(userWithoutPassword);
  }
);

// TODO: Later remove this controller
export const deleteUserById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.user.delete({ where: { id } });

    return res.status(200).json({ message: "User deleted successfully" });
  }
);
