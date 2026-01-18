import { Router } from "express";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deactivateUnit,
  restoreUnit,
} from "./unit.handler";

export const unitRouter = Router();

unitRouter.get("/", getAllUnits);
unitRouter.get("/:id", getUnitById);
unitRouter.post("/", createUnit);
unitRouter.patch("/:id", updateUnit);
unitRouter.patch("/deactive/:id", deactivateUnit);
unitRouter.patch("/restore/:id", restoreUnit);
