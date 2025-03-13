import { Router } from "express";
import { refreshAccessToken, signin } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/refresh-token", refreshAccessToken);


export default authRouter;
