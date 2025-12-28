import { Response } from "express";

export const handlePgError = (err: any, res: Response) => {
  switch (err.code) {
    case "23505":
      return res.status(409).json({
        success: false,
        message: "Data already exists",
      });

    case "23503":
      return res.status(400).json({
        success: false,
        message: "Invalid reference",
      });

    default:
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
  }
};
