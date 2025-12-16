import { Request, Response } from "express";
import {
  findAllCategories,
  insertCategory,
  setActiveCategoryById,
  updateCategory,
} from "../repositories/categories.repository";
import {
  ICategory,
  ICategoryBody,
  ICategoryParams,
} from "../models/categories.model";
import {
  ICategoryResponse,
  IErrorResponse,
} from "../../../shared/models/response.model";
import { parseBoolean } from "../../../shared/helper/parseBoolean";

export const getAllCategories = async (
  req: Request,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  try {
    const category = await findAllCategories();
    return res.status(200).json({
      success: true,
      message: "List all categories",
      results: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createCategory = async (
  req: Request<{}, {}, ICategoryBody>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("no_name_input");
    }

    const results = await insertCategory(name);
    return res.status(200).json({
      success: true,
      message: "Create category success",
      results: results,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    console.log(err);
    if (err.message === "no_name_input") {
      return res.status(400).json({
        success: false,
        message: "Category name must be filled",
      });
    }
    if (err.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Category name has already exist",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editCategory = async (
  req: Request<{ id: number }, {}, { name: string }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    const { name } = req.body;
    if (name === "") {
      throw new Error("name_empty");
    }

    const result = await updateCategory(id, name);
    if (result.length === 0) {
      throw new Error("not_found");
    }
    return res.status(200).json({
      success: true,
      message: "Category updated",
      results: result,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    console.log(err);

    if (err.message === "not_found") {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    if (err.message === "name_empty") {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deactiveCategory = async (
  req: Request<{ id: number }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await setActiveCategoryById(id, false);

    return res.status(200).json({
      success: true,
      message: "Category deactived",
      results: result,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const restoreCategory = async (
  req: Request<{ id: number }>,
  res: Response<ICategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await setActiveCategoryById(id, true);

    return res.status(200).json({
      success: true,
      message: "Category restored",
      results: result,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
