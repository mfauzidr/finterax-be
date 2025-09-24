import { Request, Response } from "express";
import { findAllBOCategories } from "../repositories/bo_categories";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = await findAllBOCategories();
  return res.json({
    success: true,
    message: "List all categories",
    results: category,
  });
};
