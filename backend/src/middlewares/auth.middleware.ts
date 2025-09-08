import { type NextFunction, type Request, type Response } from "express";

import { catchAsync } from "../lib/catchAsync";
import { prisma } from "../lib/prisma";
import { verifyAccessToken } from "../lib/jwt";

export const authorize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //   console.log("Cookies:", req.cookies);
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return res.status(401).json({ message: "User Unauthorized" });

    req.user = user;
    next();
  }
);
