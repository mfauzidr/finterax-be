import { Request, Response } from "express";
import {
  findAllBOSubCategories,
  findRelationsSubCategories,
} from "../repositories/sub_categories.repository";

export const getAllSubCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const subCategory = await findAllBOSubCategories();
  return res.json({
    success: true,
    message: "List all sub categories",
    results: subCategory,
  });
};

export const getRelationsSubCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const subCategory = await findRelationsSubCategories();
  return res.json({
    success: true,
    message: "List all relations sub categories",
    results: subCategory,
  });
};
