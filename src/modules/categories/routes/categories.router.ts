import { Router } from "express";
import {
  createCategory,
  editCategory,
  getAllCategories,
  deactiveCategory,
  restoreCategory,
} from "../handlers/categories.handler.ts";

export const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", createCategory);
categoryRouter.patch("/:id", editCategory);
categoryRouter.patch("/deactive/:id", deactiveCategory);
categoryRouter.patch("/restore/:id", restoreCategory);
