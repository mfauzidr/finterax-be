import { Router } from "express";
import { getAllProducts } from "./products.handler";

export const productsRouter = Router();

productsRouter.get("/", getAllProducts);
