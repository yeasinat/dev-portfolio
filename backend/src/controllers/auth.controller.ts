import type { NextFunction, Request, Response } from "express";

import { catchAsync } from "../lib/catchAsync";
import { prisma } from "../lib/prisma";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../lib/jwt";
import type { SignInBody } from "../schemas/auth";

// Custom typed request interface
interface SignInRequest extends Request {
  body: SignInBody;
}

export const signin = catchAsync(
  async (req: SignInRequest, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await Bun.password.verify(password, user.password);

    if (!isPasswordValid) {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const token = signAccessToken({ id: user.id, email: user.email });

    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // TODO: Use secure cookies in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // TODO: Use secure cookies in production
      sameSite: "lax", // TODO: it should be set on development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    //  console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

    res.status(200).json({
      success: true,
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

    res.status(200).json({ success: true, message: "Successfully signed out" });
  }
);

export const getCurrentUser = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        projects: true,
        technologies: true,
        experiences: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...userWithoutPassword } = user;

    if (userWithoutPassword.socialLinks) {
      userWithoutPassword.socialLinks = JSON.parse(
        userWithoutPassword.socialLinks as string
      );
    }

    res.status(200).json({ success: true, user: userWithoutPassword });
  }
);

export const refreshAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    try {
      const payload = verifyRefreshToken(refreshToken)
      const newAccessToken = signAccessToken({id: payload.id, email: payload.email})

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  }
);
