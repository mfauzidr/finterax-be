import { Router } from "express";
import { boCategoryRouter } from "./bo_categories";

const router = Router();

//== Back Office Routes ==

const boAPI = "/back-office";

router.use(`${boAPI}/categories`, boCategoryRouter);

export default router;
