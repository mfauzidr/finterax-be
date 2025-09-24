import { Request, Response } from "express";
import { findAllBOProducts } from "../repositories/bo_products";
import { IProducts } from "../models/bo_products";

export const getAllBOProducts = async (req: Request, res: Response) => {
  try {
    const products: IProducts[] = await findAllBOProducts();
    return res.status(200).json({
      success: true,
      message: "List all products",
      results: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
