import { Router } from "express";
import {
  createCategory,
  editCategory,
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
categoryRouter.patch("/:id", editCategory);
categoryRouter.patch("/deactive/:id", deactivateCategory);
categoryRouter.patch("/restore/:id", restoreCategory);
