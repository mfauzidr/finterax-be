import { Request, Response } from "express";
import {
  findAllSubCategories,
  findRelationsSubCategories,
  findSubById,
  insertSubCategory,
  insertSubCategoryRelations,
  setActiveSubById,
  updateSubCategory,
} from "../repositories/sub_categories.repository";
import {
  ICategorySubResponse,
  IErrorResponse,
  ISubCategoryResponse,
} from "../../../shared/models/response.model";
import {
  ICategorySubLinkBody,
  ISubCategoryBody,
} from "../models/sub_categories.model";
import db from "../../../shared/config/pg";
import { findSubByCategoryId } from "../repositories/categories.repository";

export const getAllSubCategories = async (
  req: Request,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  try {
    const subCategories = await findAllSubCategories();
    return res.status(200).json({
      success: true,
      message: "List all sub categories",
      results: subCategories,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSubById = async (
  req: Request<{ id: number }>,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("no_id");
    }
    console.log("program called here");
    const sub = await findSubById(id);
    if (sub.length < 1) {
      throw new Error("not_found");
    }
    return res.status(200).json({
      success: true,
      message: "Sub category retrieved successfully",
      results: sub,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    console.log(err);
    if (err.message === "no_id") {
      return res.status(400).json({
        success: false,
        message: "Sub category id must be filled",
      });
    }
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

export const getRelationsSubCategories = async (
  req: Request,
  res: Response<ICategorySubResponse>
): Promise<Response> => {
  try {
    const subCategories = await findRelationsSubCategories();
    return res.status(200).json({
      success: true,
      message: "List all relations sub categories",
      results: subCategories,
    });
  } catch (error) {
    const err = error as IErrorResponse;
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createSubCategory = async (
  req: Request<{}, {}, ISubCategoryBody>,
  res: Response<ICategorySubResponse>
) => {
  const { name, category_id } = req.body;
  try {
    const client = await db.connect();
    try {
      if (!name || name === "") {
        throw new Error("no_name_input");
      }
      if (!category_id) {
        throw new Error("no_id");
      }

      await client.query("BEGIN");

      const subCategory = await insertSubCategory(name);
      const subId = subCategory[0].id;

      const data: ICategorySubLinkBody = {
        category_id: category_id,
        sub_category_id: subId,
      };

      const categorySublink = await insertSubCategoryRelations(data);
      await client.query("COMMIT");

      const results = await findSubByCategoryId(category_id);

      res.status(201).json({
        message: "Sub category created successfully",
        results: results,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      const err = error as IErrorResponse;
      console.log(err);
      res.status(500).json({
        message: "Error creating sub category",
        err: err.message,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    const err = error as IErrorResponse;
    console.log(err);
    if (err.message === "no_name_input") {
      return res.status(400).json({
        success: false,
        message: "Sub Category name must be filled",
      });
    }
    if (err.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Sub Category name has already exist",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editSubCategory = async (
  req: Request<{ id: number }, {}, { name: string }>,
  res: Response<ISubCategoryResponse>
): Promise<Response> => {
  const { id } = req.params;
  try {
    const { name } = req.body;
    if (name === "") {
      throw new Error("name_empty");
    }

    const result = await updateSubCategory(id, name);
    if (result.length === 0) {
      throw new Error("not_found");
    }
    return res.status(200).json({
      success: true,
      message: "Sub category updated",
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
    if (err.message === "name_empty") {
      return res.status(400).json({
        success: false,
        message: "Sub category name cannot be empty",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
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
