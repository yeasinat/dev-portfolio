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

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET as string,
      {
        expiresIn: "7d", // Refresh token valid for 7 days
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // TODO: Use secure cookies in production
      sameSite: "lax",
      maxAge: expiresIn * 1000, // Convert to milliseconds
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // TODO: Use secure cookies in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    //  console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

    res.status(200).json({
      user,
      accessToken: token,
    });
  }
);

export const signout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({ message: "Successfully signed out" });
  }
);

export const refreshAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        JWT_SECRET as string
      ) as jwt.JwtPayload;

      const newAccessToken = jwt.sign(
        { id: payload.id, email: payload.email },
        JWT_SECRET as string,
        {
          expiresIn: typeof JWT_EXPIRES_IN === "number" ? JWT_EXPIRES_IN : 3600,
        }
      );

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  }
);
