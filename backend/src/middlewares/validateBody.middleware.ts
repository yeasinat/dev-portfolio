import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validateBody =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          error: "Validation error",
          errorDetails: result.error.issues,
        });
        return;
      }

      req.body = result.data;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: "Validation error", errorDetails: err });
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  };
