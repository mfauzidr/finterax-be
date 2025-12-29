import { Request, Response } from "express";
import {
  findAllSubCategories,
  findRelationsSubCategories,
  findSubById,
  setActiveSubById,
  updateSubCategory,
} from "../repositories/sub_categories.repository";
import {
  ICategorySubResponse,
  IErrorResponse,
  ISubCategoryResponse,
} from "@shared/models/response.model";
import { ISubCategoryBody } from "../models/sub_categories.model";
import { AppError } from "@shared/helper/app_error";
import { createSubCategoryWithRelation } from "../services/sub_categories.service";

export const getAllSubCategories = async (
  req: Request,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const subCategories = await findAllSubCategories();
  return res.status(200).json({
    success: true,
    message: "List all sub categories",
    results: subCategories,
  });
};

export const getSubById = async (
  req: Request<{ id: string }>,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }
  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const sub = await findSubById(parsedId);
  if (sub.length < 1) {
    throw new AppError("NOT_FOUND", "Sub Category not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Sub category retrieved successfully",
    results: sub,
  });
};

export const getRelationsSubCategories = async (
  req: Request,
  res: Response<ICategorySubResponse>
): Promise<Response> => {
  const subCategories = await findRelationsSubCategories();
  return res.status(200).json({
    success: true,
    message: "List all relations sub categories",
    results: subCategories,
  });
};

export const createSubCategory = async (
  req: Request<{}, {}, ISubCategoryBody>,
  res: Response<ICategorySubResponse>
) => {
  const { name, category_id } = req.body;

  if (!category_id) {
    throw new AppError("NO_ID", "Category id must be provided", 400);
  }

  const results = await createSubCategoryWithRelation(name, category_id);

  return res.status(201).json({
    success: true,
    message: "Sub category created successfully",
    results,
  });
};

export const editSubCategory = async (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  if (!req.body.name) {
    throw new AppError("NO_NAME", "Sub Category name must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const { name } = req.body;

  const result = await updateSubCategory(parsedId, name);
  if (result.length === 0) {
    throw new AppError("NOT_FOUND", "Sub Category not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Sub category updated",
    results: result,
  });
};

export const deactiveSub = async (
  req: Request<{ id: number }>,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await setActiveSubById(id, false);
    if (result.length < 1) {
      throw new Error("not_found");
    }
    return res.status(200).json({
      success: true,
      message: "Category deactived",
      results: result,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    console.log(err);
    if (err.message === "not_found") {
      return res.status(404).json({
        success: false,
        message: "Sub category not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const restoreSub = async (
  req: Request<{ id: number }>,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await setActiveSubById(id, true);
    if (result.length < 1) {
      throw new Error("not_found");
    }
    return res.status(200).json({
      success: true,
      message: "Category restored",
      results: result,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    console.log(err);
    if (err.message === "not_found") {
      return res.status(404).json({
        success: false,
        message: "Sub category not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
