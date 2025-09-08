import jwt, { type SignOptions } from "jsonwebtoken";
import type { AuthTokenPayload } from "../../types/auth";
import { env } from "../config/env";

function toExpiresIn(value: number | string): SignOptions["expiresIn"] {
  return value as SignOptions["expiresIn"];
}

export function signAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: toExpiresIn(env.JWT_ACCESS_EXPIRES_IN),
  });
}

export function signRefreshToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: toExpiresIn(env.JWT_REFRESH_EXPIRES_IN),
  });
}

export function verifyAccessToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthTokenPayload;
}

export function verifyRefreshToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as AuthTokenPayload;
}
