import { Router } from "express";

import { authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  getUser,
  getUserById,
  updateUser,
  deleteUserById,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
  .get("/", getUser)
  .patch("/", authorize, upload.single("image"), updateUser);
  
userRouter
  .get("/:id", authorize, getUserById)
  .delete("/:id", authorize, deleteUserById);

export default userRouter;
