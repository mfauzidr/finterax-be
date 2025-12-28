import { Request, Response } from "express";
import {
  findAllCategories,
  findCategoryById,
  findSubByCategoryId,
  insertCategory,
  setActiveCategoryById,
  updateCategory,
} from "../repositories/categories.repository";
import { ICategoryBody } from "../models/categories.model";
import {
  ICategoryResponse,
  ICategorySubResponse,
} from "@shared/models/response.model";
import { AppError } from "@shared/helper/app_error";

export const getAllCategories = async (
  req: Request,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const category = await findAllCategories();
  return res.status(200).json({
    success: true,
    message: "List all categories",
    results: category,
  });
};

export const getCategoryById = async (
  req: Request<{ id: number }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("no_id", "Category id must be filled", 400);
  }
  const categoryId = Number(req.params.id);

  const category = await findCategoryById(categoryId);
  if (category.length < 1) {
    throw new AppError("not_found", "Category not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Category retrieved successfully",
    results: category,
  });
};

export const getSubByCategoryId = async (
  req: Request<{ id: number }>,
  res: Response<ICategorySubResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("no_id", "Sub Category id must be filled", 400);
  }
  const categoryId = Number(req.params.id);

  const subCategories = await findSubByCategoryId(categoryId);
  if (subCategories.length < 1) {
    throw new AppError("not_found", "Sub Category not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "List sub categories",
    results: subCategories,
  });
};

export const createCategory = async (
  req: Request<{}, {}, ICategoryBody>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { name } = req.body;

  if (!name || name === "") {
    throw new AppError("no_name_input", "Category name cannot be empty", 400);
  }

  const results = await insertCategory(name);
  return res.status(200).json({
    success: true,
    message: "Create category success",
    results: results,
  });
};

export const editCategory = async (
  req: Request<{ id: number }, {}, { name: string }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id) {
    throw new AppError("no_id", "Sub Category id must be filled", 400);
  }
  const categoryId = Number(req.params.id);

  if (name === "") {
    throw new AppError("name_empty", "Category name cannot be empty", 400);
  }

  const result = await updateCategory(categoryId, name);
  if (result.length === 0) {
    throw new AppError("not_found", "No Category found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Category updated",
    results: result,
  });
};

export const deactiveCategory = async (
  req: Request<{ id: number }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("no_id", "Sub Category id must be filled", 400);
  }
  const categoryId = Number(req.params.id);

  const result = await setActiveCategoryById(categoryId, false);
  if (result.length < 1) {
    throw new AppError("not_found", "Category not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Category deactived",
    results: result,
  });
};

export const restoreCategory = async (
  req: Request<{ id: number }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("no_id", "Sub Category id must be filled", 400);
  }
  const categoryId = Number(req.params.id);

  const result = await setActiveCategoryById(categoryId, true);
  if (result.length < 1) {
    throw new AppError("not_found", "Category not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Category restored",
    results: result,
  });
};
