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
  req: Request<{ id: string }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const category = await findCategoryById(parsedId);
  if (category.length < 1) {
    throw new AppError("NOT_FOUND", "Category not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Category retrieved successfully",
    results: category,
  });
};

export const getSubByCategoryId = async (
  req: Request<{ id: string }>,
  res: Response<ICategorySubResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const subCategories = await findSubByCategoryId(parsedId);
  if (subCategories.length < 1) {
    throw new AppError("NOT_FOUND", "Sub Category not found", 404);
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

  if (!name?.trim()) {
    throw new AppError("NO_NAME", "Category name cannot be empty", 400);
  }

  const results = await insertCategory(name);
  return res.status(200).json({
    success: true,
    message: "Create category success",
    results: results,
  });
};

export const editCategory = async (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  if (!req.body.name) {
    throw new AppError("NO_NAME", "Category name must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const { name } = req.body;

  const result = await updateCategory(parsedId, name);
  if (result.length === 0) {
    throw new AppError("NOT_FOUND", "No Category found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Category updated",
    results: result,
  });
};

export const deactivateCategory = async (
  req: Request<{ id: string }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const result = await setActiveCategoryById(parsedId, false);
  if (result.length < 1) {
    throw new AppError("NOT_FOUND", "Category not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Category deactived",
    results: result,
  });
};

export const restoreCategory = async (
  req: Request<{ id: string }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const result = await setActiveCategoryById(parsedId, true);
  if (result.length < 1) {
    throw new AppError("NOT_FOUND", "Category not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Category restored",
    results: result,
  });
};
