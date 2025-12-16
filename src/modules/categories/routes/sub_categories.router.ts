import { Router } from "express";
import {
  getAllSubCategories,
  getRelationsSubCategories,
} from "../handlers/sub_categories.handler";

export const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/relations", getRelationsSubCategories);
