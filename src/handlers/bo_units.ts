import { Request, Response } from "express";
import { findAllBOUnits } from "../repositories/bo_units";

export const getAllUnits = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const units = await findAllBOUnits();
  return res.json({
    success: true,
    message: "List all units",
    results: units,
  });
};
