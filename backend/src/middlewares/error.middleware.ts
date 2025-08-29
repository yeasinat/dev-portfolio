import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import { NODE_ENV } from "../config/env";
import type AppError from "../lib/appError";

// TODO make better error handler later
export const errorHandler= (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const env = NODE_ENV || "development";
  const statusCode = err.statusCode || 500;
  
  if (env === "development") {
    console.error("❌ ERROR:", err);
    return res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? "Internal Server Error" : err.message,
  });
};

// export const errorMiddleware: ErrorRequestHandler = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const statusCode = err.statusCode || 500;
//   const env = NODE_ENV || "development";

//   // In Development
//   if (env === "development") {
//     console.error("❌ ERROR:", err);
//     return res.status(statusCode).json({
//       success: false,
//       message: err.message,
//       stack: err.stack,
//       error: err,
//     });
//   }

//   // In Production
//   return res.status(statusCode).json({
//     success: false,
//     message: statusCode >= 500 ? "Internal Server Error" : err.message,
//   });
// };
