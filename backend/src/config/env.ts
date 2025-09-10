import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES_IN: z.union([
    z.string().regex(/^\d+[smhd]$/, "Must be like '15m', '7d'"),
    z.number(),
  ]),
  JWT_REFRESH_EXPIRES_IN: z.union([
    z.string().regex(/^\d+[smhd]$/, "Must be like '7d'"),
    z.number(),
  ]),

  DEV_NAME: z.string().min(1),
  DEV_EMAIL: z.email(),
  DEV_PASSWORD: z.string().min(6),

  DISABLE_ADMIN_SIGNUP: z.string().optional(),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
