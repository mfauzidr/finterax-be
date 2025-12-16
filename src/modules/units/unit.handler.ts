import { Request, Response } from "express";
import { findAllUnits } from "./unit.repository";

export const getAllUnits = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const units = await findAllUnits();
  return res.json({
    success: true,
    message: "List all units",
    results: units,
  });
};
