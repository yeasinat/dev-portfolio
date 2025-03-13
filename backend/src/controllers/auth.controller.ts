import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { catchAsync } from "../lib/catchAsync";
import { prisma } from "../lib/prisma";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await Bun.password.verify(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const expiresIn =
      typeof JWT_EXPIRES_IN === "number" ? JWT_EXPIRES_IN : 3600; // Default to 1 hour if undefined

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET as string,
      {
        expiresIn,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Use secure cookies in production
      sameSite: "lax",
      maxAge: expiresIn * 1000, // Convert to milliseconds
    });

    //    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

    res.status(200).json({
      user,
    });
  }
);
