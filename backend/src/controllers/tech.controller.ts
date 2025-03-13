import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../lib/catchAsync";
import cloudinary from "../config/cloudinary";

export const createTech = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  const imgUrl = req.file?.path || null;
  const imagePublicId = req.file?.filename || null;

  const tech = await prisma.technology.create({
    data: { name, imgUrl, imagePublicId, userId: req.user.id },
  });

  return res.status(201).json(tech);
});

export const getTechnologies = catchAsync(
  async (req: Request, res: Response) => {
    const tech = await prisma.technology.findMany();

    return res.status(200).json(tech);
  }
);

export const getTechById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tech = await prisma.technology.findUnique({
    where: { id },
  });

  return res.status(200).json(tech);
});

export const updateTech = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const tech = await prisma.technology.findUnique({
    where: {id}
  })

  if(!tech){
    return res.status(404).json({message:"Technology not found"})
  }

  const updatedData: any = { name };

  const updatedTech = await prisma.technology.update({
    where: { id },
    data: updatedData,
  });

  if (req.file) {
    if (tech.imagePublicId) {
      await cloudinary.uploader.destroy(tech.imagePublicId);
    }
    tech.imgUrl = req.file?.path;
    tech.imagePublicId = req.file?.filename;
  }

  return res.status(200).json(updatedTech);
});

export const deleteTech = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.technology.delete({
    where: { id },
  });

  return res.status(200).json({ message: "Technology deleted" });
});
