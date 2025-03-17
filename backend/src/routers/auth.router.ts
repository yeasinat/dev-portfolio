import { Router } from "express";
import {
  refreshAccessToken,
  signin,
  signout,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;
