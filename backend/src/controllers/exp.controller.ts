import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../lib/catchAsync";

export const createExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { position, company, description } = req.body;
    const experience = await prisma.experience.create({
      data: { position, company, description, userId: req.user.id },
    });
    return res.status(201).json(experience);
  }
);

export const getExperiences = catchAsync(
  async (req: Request, res: Response) => {
    const experiences = await prisma.experience.findMany();
    return res.status(200).json(experiences);
  }
);

export const getExperienceById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const experience = await prisma.experience.findUnique({
      where: { id },
    });
    return res.status(200).json(experience);
  }
);

export const updateExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const experience = await prisma.experience.update({
      where: { id },
      data: req.body,
    });
    return res.status(200).json(experience);
  }
);

export const deleteExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.experience.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Experience deleted" });
  }
);
