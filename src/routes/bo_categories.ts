import { Router } from "express";
import { getAllCategories } from "../handlers/bo_categories";

export const boCategoryRouter = Router();

boCategoryRouter.get("/", getAllCategories);
