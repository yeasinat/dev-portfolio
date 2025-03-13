import { Router } from "express";

import { authorize } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", authorize, getUser);
userRouter
  .get("/:id", authorize, getUserById)
  .put("/:id", authorize, upload.single("image"), updateUserById)
  .delete("/:id", authorize, deleteUserById);

export default userRouter;
