import { Router } from "express";
import {
  getAllSubCategories,
  getRelationsSubCategories,
} from "../handlers/bo_sub_categories";

export const boSubCategoryRouter = Router();

boSubCategoryRouter.get("/", getAllSubCategories);
boSubCategoryRouter.get("/relations", getRelationsSubCategories);
