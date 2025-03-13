import jwt, { type JwtPayload } from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";

import { catchAsync } from "../lib/catchAsync";
import { JWT_SECRET } from "../config/env";
import { prisma } from "../lib/prisma";

export const authorize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //   console.log("Cookies:", req.cookies);
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return res.status(401).json({ message: "User Unauthorized" });

    req.user = user;
    next();
  }
);
