import { Request, Response } from "express";
import {
  editUnit,
  findAllUnits,
  findUnitById,
  insertUnit,
  setActiveUnitById,
} from "./unit.repository";
import { IUnitResponse } from "@shared/models/response.model";
import { AppError } from "@shared/helper/app_error";
import { IUnitBody } from "./unit.model";

export const getAllUnits = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const units = await findAllUnits();
  return res.json({
    success: true,
    message: "List all units",
    results: units,
  });
};

export const getUnitById = async (
  req: Request<{ id: string }>,
  res: Response<IUnitResponse>,
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const units = await findUnitById(parsedId);
  if (units.length < 1) {
    throw new AppError("NOT_FOUND", "Unit not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Unit retrieved successfully",
    results: units,
  });
};

export const createUnit = async (
  req: Request<{}, {}, IUnitBody>,
  res: Response<IUnitResponse>,
): Promise<Response> => {
  const { name } = req.body;

  if (!name?.trim()) {
    throw new AppError("NO_NAME", "Unit name cannot be empty", 400);
  }

  const results = await insertUnit(name);
  return res.status(200).json({
    success: true,
    message: "Create Unit success",
    results: results,
  });
};

export const updateUnit = async (
  req: Request<{ id: string }, {}, IUnitBody>,
  res: Response<IUnitResponse>,
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  if (!req.body.name) {
    throw new AppError("NO_NAME", "Unit name must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const { name } = req.body;

  const results = await editUnit(parsedId, name);
  if (results.length === 0) {
    throw new AppError("NOT_FOUND", "No Unit found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Unit updated",
    results: results,
  });
};

export const deactivateUnit = async (
  req: Request<{ id: string }>,
  res: Response<IUnitResponse>,
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const result = await setActiveUnitById(parsedId, false);
  if (result.length < 1) {
    throw new AppError("NOT_FOUND", "Unit not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Unit deactived",
    results: result,
  });
};

export const restoreUnit = async (
  req: Request<{ id: string }>,
  res: Response<IUnitResponse>,
): Promise<Response> => {
  const { id } = req.params;
  if (!id || id === ":id") {
    throw new AppError("NO_ID", "Id must be provided", 400);
  }

  const parsedId = Number(id);
  if (Number.isNaN(id)) {
    throw new AppError("INVALID_ID", "Id is invalid", 400);
  }

  const result = await setActiveUnitById(parsedId, true);
  if (result.length < 1) {
    throw new AppError("NOT_FOUND", "Unit not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Unit restored",
    results: result,
  });
};
