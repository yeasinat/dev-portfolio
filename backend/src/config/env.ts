export const {
  JWT_SECRET,
  NODE_ENV,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  DISABLE_ADMIN_SIGNUP,
  JWT_EXPIRES_IN,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in environment variables");
if (!JWT_EXPIRES_IN) throw new Error("JWT_EXPIRES_IN is not set in environment variables");
if (!NODE_ENV) throw new Error("NODE_ENV is not set");
if (!ADMIN_EMAIL) throw new Error("ADMIN_EMAIL is not set");
if (!ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is not set");
if (!DISABLE_ADMIN_SIGNUP) throw new Error("DISABLE_ADMIN_SIGNUP is not set");
if (!CLOUDINARY_CLOUD_NAME) throw new Error("CLOUDINARY_CLOUD_NAME is not set");
if (!CLOUDINARY_API_KEY) throw new Error("CLOUDINARY_API_KEY is not set");
if (!CLOUDINARY_API_SECRET) throw new Error("CLOUDINARY_API_SECRET is not set");
