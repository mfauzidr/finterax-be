import { Router } from "express";
import { getAllUnits } from "../handlers/bo_units";

export const boUnitsRouter = Router();

boUnitsRouter.get("/", getAllUnits);
