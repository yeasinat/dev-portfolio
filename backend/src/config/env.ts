export const {
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  DEV_NAME,
  DEV_EMAIL,
  DEV_PASSWORD,
  DISABLE_ADMIN_SIGNUP,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!JWT_SECRET)
  throw new Error("JWT_SECRET is not set in environment variables");
if (!JWT_EXPIRES_IN)
  throw new Error("JWT_EXPIRES_IN is not set in environment variables");
if (!NODE_ENV) throw new Error("NODE_ENV is not set");
if (!DEV_NAME) throw new Error("DEV_NAME is not set");
if (!DEV_EMAIL) throw new Error("DEV_EMAIL is not set");
if (!DEV_PASSWORD) throw new Error("DEV_PASSWORD is not set");
if (!DISABLE_ADMIN_SIGNUP) throw new Error("DISABLE_ADMIN_SIGNUP is not set");
if (!CLOUDINARY_CLOUD_NAME) throw new Error("CLOUDINARY_CLOUD_NAME is not set");
if (!CLOUDINARY_API_KEY) throw new Error("CLOUDINARY_API_KEY is not set");
if (!CLOUDINARY_API_SECRET) throw new Error("CLOUDINARY_API_SECRET is not set");
if (!JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET is not set");
if (!JWT_REFRESH_EXPIRES_IN)
  throw new Error("JWT_REFRESH_EXPIRES_IN is not set");
