import { Router } from "express";
import {
  createSubCategory,
  deactiveSub,
  editSubCategory,
  getAllSubCategories,
  getRelationsSubCategories,
  getSubById,
  restoreSub,
} from "../handlers/sub_categories.handler";

export const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/relations", getRelationsSubCategories);
subCategoryRouter.get("/:id", getSubById);
subCategoryRouter.post("/", createSubCategory);
subCategoryRouter.patch("/:id", editSubCategory);
subCategoryRouter.patch("/deactive/:id", deactiveSub);
subCategoryRouter.patch("/restore/:id", restoreSub);
