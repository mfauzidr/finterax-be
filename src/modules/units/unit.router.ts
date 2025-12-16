import { Router } from "express";
import { getAllUnits } from "./unit.handler";

export const unitRouter = Router();

unitRouter.get("/", getAllUnits);
