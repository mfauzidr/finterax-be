import { Request, Response } from "express";
import {
  findAllProducts,
  findProductByUuid,
  setActiveProductByUuid,
} from "./products.repository";
import { IProducts } from "./products.model";
import { IProductResponse } from "@shared/models/response.model";
import { AppError } from "@shared/helper/app_error";

export const getAllProducts = async (
  req: Request,
  res: Response<IProductResponse>,
): Promise<Response> => {
  const products: IProducts[] = await findAllProducts();
  return res.status(200).json({
    success: true,
    message: "List all products",
    results: products,
  });
};

export const getProductByUuid = async (
  req: Request<{ uuid: string }>,
  res: Response<IProductResponse>,
): Promise<Response> => {
  const { uuid } = req.params;
  if (!uuid || uuid === ":uuid") {
    throw new AppError("NO_ID", "UUID must be provided", 400);
  }

  const product = await findProductByUuid(uuid);
  if (product.length < 1) {
    throw new AppError("NOT_FOUND", "Product not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Product retrieved successfully",
    results: product,
  });
};

export const deactivateProduct = async (
  req: Request<{ uuid: string }>,
  res: Response<IProductResponse>,
): Promise<Response> => {
  const { uuid } = req.params;
  if (!uuid || uuid === ":uuid") {
    throw new AppError("NO_ID", "UUID must be provided", 400);
  }

  const result = await setActiveProductByUuid(uuid, false);
  if (result.length < 1) {
    throw new AppError("NOT_FOUND", "Product not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Product deactived",
    results: result,
  });
};

export const restoreProduct = async (
  req: Request<{ uuid: string }>,
  res: Response<IProductResponse>,
): Promise<Response> => {
  const { uuid } = req.params;
  if (!uuid || uuid === ":uuid") {
    throw new AppError("NO_ID", "UUID must be provided", 400);
  }

  const result = await setActiveProductByUuid(uuid, true);
  if (result.length < 1) {
    throw new AppError("NOT_FOUND", "Product not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Product restored",
    results: result,
  });
};
