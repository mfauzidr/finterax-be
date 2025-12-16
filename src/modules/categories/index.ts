import { Router } from "express";
import { categoryRouter } from "./routes/categories.router";
import { subCategoryRouter } from "./routes/sub_categories.router";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/sub-categories", subCategoryRouter);

export default router;
