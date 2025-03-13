import { Router } from "express";
import {
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller";
import { authorize } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", authorize, getUser);
userRouter
  .get("/:id", authorize, getUserById)
  .put("/:id", authorize, updateUserById)
  .delete("/:id", authorize, deleteUserById);

export default userRouter;
