import { Router } from "express";
import {
  createCategory,
  updateCategory,
  getAllCategories,
  deactivateCategory,
  restoreCategory,
  getSubByCategoryId,
  getCategoryById,
} from "../handlers/categories.handler";

export const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.get("/sub/:id", getSubByCategoryId);
categoryRouter.post("/", createCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.patch("/deactive/:id", deactivateCategory);
categoryRouter.patch("/restore/:id", restoreCategory);
