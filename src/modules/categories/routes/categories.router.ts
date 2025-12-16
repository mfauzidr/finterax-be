import { Router } from "express";
import {
  createCategory,
  editCategory,
  getAllCategories,
} from "../handlers/categories.handler.ts";

export const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", createCategory);
categoryRouter.patch("/:id", editCategory);
