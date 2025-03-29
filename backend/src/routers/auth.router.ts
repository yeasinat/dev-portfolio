import { Router } from "express";
import {
  getCurrentUser,
  refreshAccessToken,
  signin,
  signout,
} from "../controllers/auth.controller";
import { authorize } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/me", authorize, getCurrentUser);

export default authRouter;
