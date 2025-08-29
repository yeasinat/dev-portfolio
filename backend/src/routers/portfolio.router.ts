import { Router } from "express";

import { authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/project.controller";
import {
  createTech,
  deleteTech,
  getTechById,
  getTechnologies,
  updateTech,
} from "../controllers/tech.controller";
import {
  createExperience,
  getExperienceById,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../controllers/exp.controller";

const portfolioRouter = Router();

// Project Routes
portfolioRouter
  .post("/projects/", authorize, upload.single("image"), createProject)
  .get("/projects/", getProjects);

portfolioRouter
  .get("/projects/:id", authorize, getProjectById)
  .put("/projects/:id", authorize, upload.single("image"), updateProject)
  .delete("/projects/:id", authorize, deleteProject);

// Technology Routes
portfolioRouter
  .post("/tech/", authorize, upload.single("image"), createTech)
  .get("/tech/", getTechnologies);

portfolioRouter
  .get("/tech/:id", authorize, getTechById)
  .put("/tech/:id", authorize, upload.single("image"), updateTech)
  .delete("/tech/:id", authorize, deleteTech);

// Experience Routes
portfolioRouter
  .post("/experiences/", authorize, createExperience)
  .get("/experiences/", getExperiences);

portfolioRouter
  .get("/experiences/:id", authorize, getExperienceById)
  .put("/experiences/:id", authorize, updateExperience)
  .delete("/experiences/:id", authorize, deleteExperience);

export default portfolioRouter;
