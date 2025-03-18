import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../lib/catchAsync";
import cloudinary from "../config/cloudinary";

export const createProject = catchAsync(async (req: Request, res: Response) => {
  // check if file is uploaded
  // console.log(
  //   "🛠️ Uploaded File:",
  //   req.file ? JSON.stringify(req.file, null, 2) : "No file received"
  // );

  const { title, description, liveLink, repoLink, technologiesUsed } = req.body;
  const imgUrl = req.file?.path || null;
  const imagePublicId = req.file?.filename || null;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      liveLink,
      repoLink,
      imgUrl,
      imagePublicId,
      technologiesUsed,
      userId: req.user.id,
    },
  });

  return res.status(201).json(project);
});

export const getProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany();

  return res.status(200).json(projects);
});

export const getProjectById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    return res.status(200).json(project);
  }
);

export const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, liveLink, repoLink, technologiesUsed } = req.body;
  // console.log(id);

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  let updatedData: any = { title, description, liveLink, repoLink, technologiesUsed };

  // console.log(req.file);
  if (req.file) {
    if (project.imagePublicId) {  
      await cloudinary.uploader.destroy(project.imagePublicId);
    }
    updatedData.imgUrl = req.file?.path;
    updatedData.imagePublicId = req.file?.filename;
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: updatedData,
  });

  return res.status(200).json(updatedProject);
});

export const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.project.delete({
    where: { id },
  });
  return res.status(200).json({ message: "Project deleted" });
});
