import { Router } from "express";
import { boCategoryRouter } from "./bo_categories";
import { boSubCategoryRouter } from "./bo_sub_categories";
import { boUnitsRouter } from "./bo_units";
import { boProductsRouter } from "./bo_products";

const router = Router();

//== Back Office Routes ==

const BOEndPoint = "/back-office";

router.use(`${BOEndPoint}/categories`, boCategoryRouter);
router.use(`${BOEndPoint}/sub-categories`, boSubCategoryRouter);
router.use(`${BOEndPoint}/units`, boUnitsRouter);
router.use(`${BOEndPoint}/products`, boProductsRouter);

export default router;
