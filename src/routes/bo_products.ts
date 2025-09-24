import { Router } from "express";
import { getAllBOProducts } from "../handlers/bo_products";

export const boProductsRouter = Router();

boProductsRouter.get("/", getAllBOProducts);
