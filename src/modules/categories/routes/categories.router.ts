import { Router } from "express";
import {
  createCategory,
  editCategory,
  getAllCategories,
  deactiveCategory,
  restoreCategory,
  getSubByCategoryId,
  getCategoryById,
} from "../handlers/categories.handler.ts";

export const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.get("/sub/:id", getSubByCategoryId);
categoryRouter.post("/", createCategory);
categoryRouter.patch("/:id", editCategory);
categoryRouter.patch("/deactive/:id", deactiveCategory);
categoryRouter.patch("/restore/:id", restoreCategory);
