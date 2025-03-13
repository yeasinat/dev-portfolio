import express, { type ErrorRequestHandler, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { prisma } from "./lib/prisma";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import portfolioRouter from "./routers/portfolio.router";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/portfolio", portfolioRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Dev Portfolio API");
});

app.use(errorHandler as unknown as ErrorRequestHandler);

app.listen(3000, async () => {
  await prisma.$connect();
  console.log("Database connected");
  console.log("Server is running on port 3000");
});

