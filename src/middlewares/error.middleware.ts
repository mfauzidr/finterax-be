import { AppError } from "@shared/helper/app_error";
import { handlePgError } from "@shared/helper/handle_pg_error";
import { logger } from "@shared/logger/logger";
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message,
    code: err.code,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.code) {
    return handlePgError(err, res);
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
