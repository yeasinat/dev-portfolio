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

  if (userWithoutPassword.socialLinks) {
    userWithoutPassword.socialLinks = JSON.parse(
      userWithoutPassword.socialLinks as string
    );
  }

  return res.status(200).json({ success: true, user: userWithoutPassword });
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

  if (userWithoutPassword.socialLinks) {
    userWithoutPassword.socialLinks = JSON.parse(
      userWithoutPassword.socialLinks as string
    );
  }

  return res.status(200).json({ success: true, user: userWithoutPassword });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, bio, socialLinks } = req.body;

  const user = await prisma.user.findFirst();

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
    where: { id: user.id },
    data: updatedData,
  });

  const { password, ...userWithoutPassword } = updatedUser;
  if (userWithoutPassword.socialLinks) {
    userWithoutPassword.socialLinks = JSON.parse(
      userWithoutPassword.socialLinks as string
    );
  }

  return res.status(200).json(userWithoutPassword);
});

// TODO: Later remove this controller
export const deleteUserById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.user.delete({ where: { id } });

    return res.status(200).json({ message: "User deleted successfully" });
  }
);
