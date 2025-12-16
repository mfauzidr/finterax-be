import { Router } from "express";
import { getAllProductUnits } from "./product_units.handler";

export const productUnitsRouter = Router();

productUnitsRouter.get("/", getAllProductUnits);
