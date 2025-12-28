import { AppError } from "@shared/helper/app_error";
import { handlePgError } from "@shared/helper/handle_pg_error";
import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

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
