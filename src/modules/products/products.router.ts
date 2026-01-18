import { Router } from "express";
import {
  getAllProducts,
  getProductByUuid,
  deactivateProduct,
  restoreProduct,
} from "./products.handler";

export const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:uuid", getProductByUuid);
//create
//update
productsRouter.patch("/deactive/:uuid", deactivateProduct);
productsRouter.patch("/restore/:uuid", restoreProduct);
