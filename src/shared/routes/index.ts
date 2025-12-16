import { Router } from "express";
import catgoriesModuleRouter from "../../modules/categories";
import { unitRouter } from "../../modules/units/unit.router";
import { productsRouter } from "../../modules/products/products.router";
import { productUnitsRouter } from "../../modules/product_units/product_units.router";

const router = Router();

// Back Office //
router.use(`/back-office/`, catgoriesModuleRouter);
router.use(`/back-office/units`, unitRouter);
router.use(`/back-office/product-units`, productUnitsRouter);
router.use(`/back-office/products`, productsRouter);

export default router;
