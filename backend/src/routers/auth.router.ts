import { Router } from "express";
import {
  getCurrentUser,
  refreshAccessToken,
  signin,
  signout,
} from "../controllers/auth.controller";
import { authorize } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { signInSchema } from "../schemas/auth";

const authRouter = Router();

authRouter.post("/signin", validateBody(signInSchema), signin);
authRouter.post("/signout", signout);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.get("/me", authorize, getCurrentUser);

export default authRouter;
